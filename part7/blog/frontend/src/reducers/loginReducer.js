import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'



const loginReducer = (state='', action) => {
  switch(action.type){

  case 'LOGIN_USER':
  {
    return action.data ? action.data : state
  }

  case 'LOGGED_USER':
  {
    return action.data ? action.data : state
  }

  case 'LOGOUT_USER':
    return ''
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    let user
    try {
      user = await loginService.login(credentials)

    }catch(exception){
      dispatch(setNotification('Wrong user', 'ERROR', 5000))
    }


    dispatch({
      type: 'LOGIN_USER',
      data: user
    })
  }
}

export const loggedUser = (userLogin) => {

  return async dispatch => {
    const user = await userService.getOneByUsername(userLogin.username)

    const userWithToken = { ...user, token: userLogin.token }
    dispatch({
      type: 'LOGGED_USER',
      data: userWithToken
    })
  }
}

export const logoutUser = () => {
  window.localStorage.removeItem('loggedBlogappUser')
  return ({
    type: 'LOGOUT_USER'
  })
}



export default loginReducer