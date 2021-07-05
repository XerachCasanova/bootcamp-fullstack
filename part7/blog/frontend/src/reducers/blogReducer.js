import blogService from '../services/blogs'
import commentService from '../services/comments'
import { setNotification } from '../reducers/notificationReducer'

const blogReducer = (state = '', action) => {

  let newState
  switch (action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':{
    return action.data ? action.data : state
  }
  case 'CREATE_COMMENT': {
    return action.data
  }
  case 'UPDATE_LIKES': {
    newState = action.data.map(blog => blog)
    return newState.sort((a,b) => b.likes - a.likes)
  }
  case 'REMOVE_BLOG':
    newState = action.data.map(blog => blog)
    return newState.sort((a,b) => b.likes - a.likes)
  default:
    return state
  }


}

export const createBlog = (blog) => {

  return async dispatch => {
    let blogs
    try {
      await blogService.create(blog)
      blogs = await blogService.getAll()
      dispatch(setNotification('blog Added', 'DONE',5000))
    }catch(exception){
      dispatch(setNotification('blog was not added, please, fill all fields', 'ERROR',5000))
    }




    dispatch({
      type: 'CREATE_BLOG',
      data: blogs
    })
  }

}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()

    dispatch({
      type: 'REMOVE_BLOG',
      data: blogs
    })
  }
}

export const updateLikes = (id) => {

  return async dispatch => {

    const blogToChange = await blogService.getOneById(id)
    await blogService.update({ ...blogToChange, likes: blogToChange.likes+1 }, id)
    const blogsUpdated = await blogService.getAll()

    dispatch({
      type: 'UPDATE_LIKES',
      data: blogsUpdated
    })
  }

}

export const createComment = (id, comment) => {

  return async dispatch => {

    await commentService.create({ content: comment }, id)

    const blogsUpdated = await blogService.getAll()

    dispatch( {

      type: 'CREATE_COMMENT',
      data: blogsUpdated
    })
  }
}

export const initializeBlogs = () => {

  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }

}

export default blogReducer