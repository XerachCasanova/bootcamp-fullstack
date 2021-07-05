const commentsRouter = require('express').Router()

const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/:id/comments', async(request, response) => {

  const comments = await Comment
    .find({ blog: { _id: request.params.id } })
    .populate('blog', { title: 1, author: 1 })


  response.json(comments)

})


commentsRouter.post('/:id/comments', async(request, response) => {

  const body = request.body


  if(!request.params.id) return response.status(401).end('blog id missing')

  const comment = new Comment(
    {
      content: body.content,
      blog: request.params.id
    }
  )

  if (!comment.content) return response.status(400).end()

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  const savedComment = await comment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()


  response.json(savedComment)

})

module.exports = commentsRouter