import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
//import loginService from '../services/login'

const Blog = ({ blog, handleChange }) => {

  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleLikes = async () => {
    handleChange()
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blogLikes+1,
      user: blog.user.id
    }

    await blogService.update(blogObject, blog.id)

    setBlogLikes(blogLikes+1)


  }

  const handleRemove = async () => {

    if (window.confirm(`do you want to remove the blog titled '${blog.title}'?`)) {
      await blogService.remove(blog.id)
      handleChange()
    }

  }

  const blogInfo = () => (
    <Togglable buttonLabelHide='view' buttonLabelVisible='hide'>
      <div>{blog.url}</div>
      <div data-test-id="blog-likes">likes {blogLikes}<button name='blog-like-button' onClick={handleLikes}>like</button></div>
      {loggedUser !== null && loggedUser.username === blog.user.username ?
        <div><button onClick={handleRemove}>remove</button></div>
        :
        <></>
      }


    </Togglable>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{blogInfo()}
    </div>
  )

}


export default Blog

//code without TOGGLABLE IMPLEMENTATION

/*
import React, { useState } from 'react'
//import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, handleChange }) => {

  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const [viewButtonLabel, setViewButtonLabel] = useState('view')

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleLikes = async () => {
    const blogObject = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blogLikes+1,
      user: blog.user.id
    }

    await blogService.update(blogObject, blog.id)

    setBlogLikes(blogLikes+1)

    handleChange()
  }

  const handleRemove = async () => {

    if (window.confirm(`do you want to remove the blog titled '${blog.title}'?`)) {
      await blogService.remove(blog.id)
      handleChange()
    }

  }


  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
    viewButtonLabel === 'view' ? setViewButtonLabel('hide') : setViewButtonLabel('view')
  }

  return (
    <div style={blogStyle}>
      <div className="blogContent">
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{viewButtonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>likes {blogLikes}<button onClick={handleLikes}>like</button></div>
        {loggedUser !== null && loggedUser.username === blog.user.username ?
          <div><button onClick={handleRemove}>remove</button></div>
          :
          <></>
        }
      </div>
    </div>

  )

}


export default Blog

*/
