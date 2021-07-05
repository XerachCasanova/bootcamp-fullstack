const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'superuser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {

      username: 'xermam',
      name: 'Xerach Casanova',
      password: 'cabrera',
    }


    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = await usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation do not succeeds when password length is < 3,', async () => {

    const newUser = {
      username: 'alfred',
      name: 'rodríguez',
      password: 'aa'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creation do not succeeds when username length is < 3,', async () => {

    const newUser = {
      username: 'al',
      name: 'rodríguez',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creation do not succeeds when username is not provided,', async () => {

    const newUser = {
      name: 'rodríguez',
      password: '123456'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creation do not succeeds when password is not provided,', async () => {

    const newUser = {
      username: 'alfred',
      name: 'rodríguez'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})