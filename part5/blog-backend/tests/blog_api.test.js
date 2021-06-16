const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

let token

beforeEach(async () => {


  await Blog.deleteMany({})
  await User.deleteMany({})


  await User.deleteMany({})

  let passwordHash

  for (let user of helper.initialUsers) {
    passwordHash = await bcrypt.hash(user.password, 10)
    const userToSave =
      {
        username: user.username,
        name: user.name,
        passwordHash
      }
    let userObject = new User(userToSave)
    await userObject.save()
  }

  const usersInDb = await helper.usersInDb()

  for (let blog of helper.initialBlogs) {
    const nUser = Math.floor(Math.random() * (usersInDb.length-1 - 0))

    let blogObject = new Blog(blog)
    blogObject.user = usersInDb[nUser]._id

    await blogObject.save()
  }

  const getToken = async () => {
    const user = helper.oneUser

    const response = await api
      .post('/api/login')
      .send(user)
      .expect(200)

    return response.body.token
  }

  token = await getToken()

})

describe('when there is initially some blogs saved', () => {

  test('Blogs are returned as json', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('A specific blog is within returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('como afilar un lápiz')
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('property id is defined', async () => {

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      expect(blogObject.id).toBeDefined()
    }

  })

})

describe('viewing a specific blog', () => {

  test('suceeds with a valid id', async() => {
    const blogsAtStart =  await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if blog does not exists', async () => {

    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {

    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

})

describe('addition of a new blog', () => {

  test('succeeds with valid data', async () => {

    const newBlog =
      {
        title: 'Blog añadido en los tests',
        author: 'Juan Cabrera',
        url: 'lawebdejuan.com',
        likes: 15
      }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Blog añadido en los tests')


  })

  test('succeeds with valid data but without likes property (default likes: 0)', async () => {


    const newBlog =
      {
        title: 'Blog without likes',
        author: 'Pepe Villuela',
        url: 'villuela.es',

      }


    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[Object.keys(blogsAtEnd).length-1]

    expect(lastBlog.likes).toBeDefined
  })

  test('fail with status code 400 if data invalid', async () => {

    const newBlog =
      {
        url: 'villuela.es',
        likes: 2
      }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })


})

describe('deletion of a blog', () => {

  test('suceeds with status code 204 if id is valid', async () => {

    const oneUser = helper.oneUser
    const user = await User.findOne({ username: oneUser.username })
    const blogToCreateAndDelete =
      {
        title: 'this blog will be deleted',
        author: 'this author will be deleted',
        url: 'urldeleted.com',
        likes: 0

      }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogToCreateAndDelete)
      .expect(200)


    const blogToDelete = await Blog.findOne({ title: 'this blog will be deleted' })

    await api
      .delete(`/api/blogs/${blogToDelete._id.toString()}`)
      .set('Authorization', `bearer ${token}`)
      .send(user.toJSON())
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(titles).not.toContain('this blog will be deleted')
  })


})

describe('updating a blog', () => {

  test('suceeds with status code 200 if update is valid and likes are updated', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 15
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).not.toContain(blogsAtStart[0].likes)

  })
})

afterAll(() => {
  mongoose.connection.close()
})