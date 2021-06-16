const _ = require('lodash')

const dummy = (blogs) => {

  return 1
}

const totalLikes = (blogs) => {

  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((acc, current) => acc + current, 0)

}

const favoriteBlog = (blogs) => {
  //la siguiente línea de código funcionaría. Pero es más legible dividirlo:

  //return blogs.find(blog => blog.likes === blogs.map(blog => blog.likes).reduce((acc,current) => Math.max(acc, current)))

  const likes = blogs.map(blog => blog.likes)
  const maxLikes = likes.reduce((acc, current) => Math.max(acc, current))
  return blogs.find(blog => blog.likes === maxLikes)

}

const mostBlogs = (blogs) => {

  //Implement withtout Lodash:
  /*let authors = []

  blogs.forEach(blog => {

    if (!authors.some(author => author.author === blog.author)) {
      //authors = authors.filter(author => blog.author !== author.author)
      authors = [...authors,
        {
          author: blog.author,
          blogs: blogs.reduce((acc, current) => {

            if (current.author === blog.author) acc++
            return acc
          }, 0)
        }
      ]
    }
  }
  )

  const numberOfBlogs = authors.map(author => author.blogs)
  const maxOfBlogs = numberOfBlogs.reduce((acc, current) => Math.max(acc, current))*/


  //Implement with Lodash
  const authorsBlogsCounted = _(blogs)
    .countBy('author')
    .map((numberOfBlogs, author) =>  ({ author: author, blogs: numberOfBlogs } ))
    .value()


  return  _.maxBy(authorsBlogsCounted, (author) => author.blogs)

}

const mostLikes = (blogs) => {


  const groupedAuthors = _(blogs)
    .groupBy(blog => blog.author)
    .map((blog, author) => ({ author: author, likes: _.sumBy(blog, 'likes') }) )
    .value()

  console.log(_.maxBy(groupedAuthors, 'likes'))
  return _.maxBy(groupedAuthors, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

