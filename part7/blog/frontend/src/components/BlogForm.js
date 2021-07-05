import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

import {
  Box,
  Typography,
  TextField,
  Button
} from '@material-ui/core'

const BlogForm = ({ handleToggle }) => {



  const dispatch = useDispatch()
  const handleSubmit = async (event) => {

    event.preventDefault()

    await dispatch(createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }))
    dispatch(initializeUsers())

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    handleToggle()

  }

  return (
    <Box>
      <Box pt={2} pb={2}>
        <Typography variant='h4'>
          create new
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box pt={2} pb={2}>
          <div>
            <TextField label='title' placeholder='title' name='title' />

          </div>
          <div>
            <TextField label='author' placeholder='author' name='author' />

          </div>
          <div>
            <TextField label='url' placeholder='url' name='url' />
          </div>
        </Box>

        <Box pt={2} pb={2}>
          <Button variant="contained" color="primary" type="submit">
            create blog
          </Button>
        </Box>

      </form>
    </Box>

  )

}


export default BlogForm