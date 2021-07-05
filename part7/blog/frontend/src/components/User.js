import React from 'react'
import { removeBlog } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch  } from 'react-redux'

import {
  Link,
} from 'react-router-dom'

import DeleteIcon from '@material-ui/icons/Delete'
import {
  Box,
  Button,
  Typography,
  Link as MLink,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
//import { useSelector } from 'react-redux'

const User = ({ user }) => {

  const dispatch = useDispatch()
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

  const handleRemove = async (blog) => {
    if (window.confirm(`do you want to remove the blog titled '${blog.title}'?`)) {
      await dispatch(removeBlog(blog.id))
      dispatch(initializeUsers())
    }
  }

  if (!user) {
    return <div></div>
  }

  return (
    <Box>
      <Box pt={2} pb={2}>
        <Typography variant='h4'>
          {user.name}
        </Typography>
      </Box>

      <Box pt={2} pb={2}>
        <Typography variant='h5'>
        added blogs
        </Typography>
      </Box>

      <Table>
        <TableBody>
          {user.blogs.map(blog => <TableRow key={blog.id}>
            <TableCell>
              <MLink component={Link} to={`/blogs/${blog.id}`}>{blog.title}</MLink>
            </TableCell>
            <TableCell>
              { loggedUser !== null && loggedUser.username === user.username ?

                <Button onClick={() => handleRemove(blog)} color='secondary' size='small'><DeleteIcon /></Button>
                :
                <p></p>
              }
            </TableCell>

          </TableRow>)}
        </TableBody>
      </Table>
    </Box>
  )
}


export default User