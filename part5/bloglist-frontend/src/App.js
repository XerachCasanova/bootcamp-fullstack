import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      console.log('logged with ', username, password)
      const user = await loginService.login({
        username, password,
      })



      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')

    } catch (exception) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }


  }

  const handleLogout = (event) => {

    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = () => (

    <form onSubmit={handleLogin} >
      <div>
        Username:
        <input
          placeholder='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:
        <input
          placeholder='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>

    </form>

  )

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setMessage('a new Blog added')
    setTimeout(() => {
      setMessage(null)
    },5000)


  }
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabelHide="new blog" buttonLabelVisible='cancel' ref={blogFormRef}>
      <BlogForm createBlog = {createBlog} />
    </Togglable>

  )

  const blogChanged = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )

  }

  const blogsOrderedByLikes = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

  return (
    <div>

      { user === null ?
        <div>
          <h2>Log in to the application</h2>
          <Notification message={message} type='ERROR' />
          {loginForm()}
        </div>
        :
        <div>
          <h1>blogs</h1>
          <Notification message={message} type='DONE' />
          <p>{user.name} logged in <button type='submit' onClick={handleLogout}> logout </button></p>
          {blogForm()}

          {blogsOrderedByLikes.map(blog =>
            <Blog key={blog.id} blog={blog} handleChange = {blogChanged}  />
          )}
        </div>
      }
    </div>
  )
}

export default App