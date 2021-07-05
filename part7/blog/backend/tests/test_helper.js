const Blog = require('../models/blog')
const User = require('../models/user')


const initialUsers = [
  {
    username: 'root',
    name: 'superuser',
    password: 'sekret'

  },
  {
    username: 'xermam',
    name: 'Xerach Casanova',
    password: 'cabrera'
  },
  {
    username: 'ramon',
    name: 'Ramón García',
    password: 'rg1010'
  }
]
const initialBlogs = [
  {
    title: 'Comenzamos la app de blog',
    author: 'Xerach E. Casanova',
    url: 'miweb.com',
    likes: 4
  },
  {
    title: 'como afilar un lápiz',
    author: 'Juanito Balderrama',
    url: 'afilatulapiz.com',
    likes: 105
  },
  {
    title: 'tercer blog',
    author: 'PepeVilluela',
    url: 'tercerblog.com',
    likes: 2
  }

]

const oneUser = initialUsers[1]

const nonExistingId = async () => {

  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()

}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())

}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = {

  initialBlogs,
  initialUsers,
  oneUser,
  blogsInDb,
  nonExistingId,
  usersInDb

}