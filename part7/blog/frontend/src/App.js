import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  Link,
} from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core'

import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logoutUser, loggedUser } from './reducers/loginReducer'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'



const App = () => {

  const user = useSelector(state => state.userLogin)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(initializeBlogs())
    dispatch(initializeUsers())

  },[dispatch])


  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const initialLoggedUser = JSON.parse(loggedUserJSON)
      dispatch(loggedUser(initialLoggedUser))
    }
  },[])


  blogService.setToken(user.token)


  if (user) {
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
  }


  const handleLogout = (event) => {

    event.preventDefault()
    dispatch(logoutUser())
  }


  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const matchUsers = useRouteMatch('/users/:id')

  const userSelected = matchUsers
    ? users.find(user => user.id === matchUsers.params.id)
    : null

  const matchBlogs = useRouteMatch('/blogs/:id')

  const blogSelected = matchBlogs
    ? blogs.find(blog => blog.id === matchBlogs.params.id)
    : null


  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user !== ''
            ? <em>{user.name} logged in <Button type='submit' onClick={handleLogout} color='inherit'> logout </Button></em>
            :
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          }
        </Toolbar>
      </AppBar>

      <div>
        <Notification  />
      </div>
      <Switch>
        <Route path="/users/:id">
          <User user={userSelected}/>
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={blogSelected}/>
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/login">
          <UserForm />
        </Route>
        <Route path="/">
          <BlogList  />
        </Route>

      </Switch>

    </Container>

  )
}

export default App