import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

import {
  Button,
  TextField,
  Box
} from '@material-ui/core'

const CommentForm = ({ blogId }) => {

  const dispatch = useDispatch()
  const handleSubmit = (event) => {

    event.preventDefault()

    dispatch(createComment(blogId, event.target.comment.value))

    setNotification('comment added', 'DONE', 5000)

    event.target.comment.value=''
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box pt={2} pb={2} >
          <TextField name='comment' label='comment' />
        </Box>
        <div>
          <Button type='submit' variant="contained" color="primary">add comment</Button>
        </div>
      </form>
    </div>
  )

}

export default CommentForm