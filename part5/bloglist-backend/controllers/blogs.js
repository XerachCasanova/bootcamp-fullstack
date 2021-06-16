const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }


})

blogsRouter.delete('/:id', async (request, response) => {


  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid ' })
  }


  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }
  const userDb = blog.user

  if (userDb.toString() === decodedToken.id) {
    await blog.remove()
    response.status(204).end()
  }
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'Authentification error' })
  }

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }


  )
  if (!blog.title || !blog.url || blog.title ==='' || blog.url === ''){
    return response.status(400).end()
  }
  if (!blog.likes) {
    blog.likes = 0
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)


})


blogsRouter.put('/:id', async (request, response) => {


  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog.toJSON())

})


module.exports = blogsRouter