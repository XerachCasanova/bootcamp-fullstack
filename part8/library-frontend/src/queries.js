import {gql} from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published
      genres: $genres
    
    ){
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation editBirthYear($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      setBornTo: $born
    ){
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me{
      username
      favoriteGenre
  }
}
`

export const FIND_BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`