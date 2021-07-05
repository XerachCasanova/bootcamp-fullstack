import React, { useRef } from 'react'
//import Blog from './Blog'
import {
  Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { useSelector  } from 'react-redux'
import BlogForm  from './BlogForm'
import Togglable from './Togglable'

import DeleteIcon from '@material-ui/icons/Delete'
import {
  Box,
  Button,
  Link as MLink,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'



const BlogList = () => {


  const dispatch = useDispatch()

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const blogFormRef = useRef()
  const handleToggle = () => {
    blogFormRef.current.toggleVisibility()
  }

  const blogForm = () => (
    <Togglable buttonLabelHide="new blog" buttonLabelVisible='cancel' ref={blogFormRef}>

      <BlogForm handleToggle={handleToggle}/>
    </Togglable>

  )




  const handleRemove = async (blog) => {
    if (window.confirm(`do you want to remove the blog titled '${blog.title}'?`)) {
      dispatch(removeBlog(blog.id))

    }

  }

  const blogs = useSelector(state => state.blogs)

  if (blogs) {
    const blogsOrderedByLikes = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

    return (
      <Box>
        <Box pt={2} pb={2}>
          <Typography variant="h3">
            List of recommended blogs
          </Typography>
        </Box>

        <Box pt={2} pb={2}>
          {loggedUser ?  blogForm() : <p></p>}
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogsOrderedByLikes.map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <MLink component={Link} to={`/blogs/${blog.id}`}>{blog.title}</MLink> by {blog.author}

                  </TableCell>
                  <TableCell>
                    { loggedUser !== null && loggedUser.username === blog.user.username ?

                      <Button onClick={() => handleRemove(blog)} color='secondary' size='small'><DeleteIcon /></Button>
                      :
                      <p></p>
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>)

  } else {
    return <div>no blogs</div>
  }

}

export default BlogList