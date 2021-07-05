import React from 'react'
//import Togglable from './Togglable'
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Paper
} from '@material-ui/core'
import CommentForm from './CommentForm'
import { useDispatch } from 'react-redux'
import { updateLikes } from '../reducers/blogReducer'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikes = async () => {

    dispatch(updateLikes(blog.id))

  }

  console.log(blog.comments)

  return (
    <Box>
      <Box pt={2} pb={2}>
        <Typography variant='h4'>{blog.title}</Typography>
      </Box>
      <Box pt={2} pb={2}>
        <Typography variant='body1'>{blog.url}</Typography>
        <Typography variant='body1'>{blog.likes} <button onClick={handleLikes}>Like</button></Typography>
        <Typography variant='body1'>added by {blog.user.name}</Typography>
      </Box>
      <Divider />
      <Box>
        <Typography variant='h5'>comments</Typography>

        <Box pt={2} pb={2}>
          <CommentForm blogId={blog.id} />
        </Box>
        <Divider />
      </Box>

      <List component={Paper}>
        {blog.comments.length > 0
          ?  blog.comments.map(comment => <ListItem  key={comment.id}><Typography variant='body1'>{comment.content}</Typography></ListItem>)
          : <ListItem><Typography variant='body1'>no comments</Typography></ListItem>}
      </List>
    </Box>
  )

}


export default Blog
