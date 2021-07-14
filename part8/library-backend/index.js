const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')


const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const JWT_SECRET = 'SECRETTOKENKEY'

const {PubSub} = require('apollo-server')
const pubsub = new PubSub()

const MONGODB_URI = 'mongodb+srv://fullstack:opositando@cluster0.26r7i.mongodb.net/library-app?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: String
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allAuthors: [Author!]!
    allBooks(title: String, genre: String): [Book!]!
    findBooks(author: String!): [Book]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
  
`

const { v1: uuid } = require('uuid')

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allAuthors: () => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      let books
      args.title
      ? books = await Book.find({title: args.title}).populate('author')
      : args.genre
        ? books = await Book.find({genres: args.genre}).populate('author')
        : books = await Book.find({}).populate('author')
        
      return books
    },

    findBooks: async (root, args) => {

      const author = await Author.findOne({ name: args.author })
      return Book.find({ author: { _id: author._id } }).populate('author')
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {

      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: { _id: author._id } })
      return books.length
    },

  },
  
  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      
      let author = await Author.findOne({ name: args.author })    
      
      if (!author) {
        
        author = new Author({
          name: args.author
        })

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args.author
          })
        }
      }
 
      const book = new Book({
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })

      try {

        await book.save()

      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      pubsub.publish('BOOK_ADDED', {bookAdded: book})
      return book
    },

    addAuthor: async (root, args, context) => {
      const author = new Author({ ...args })

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: 'args',
        })
      }
      return author
    },

    editAuthor: async (root, args, context) => {

      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author

    },

    createUser: (root, args) => {
      const user = new User({ ...args })
      
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secred') {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }

  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})