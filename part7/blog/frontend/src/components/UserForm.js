import React  from 'react'
import { loginUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import {
  Box,
  TextField,
  Button
} from '@material-ui/core'

import {
  useHistory
} from 'react-router-dom'


const UserForm = () => {

  const dispatch = useDispatch()

  const history = useHistory()


  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value


    console.log('trying to log with ', username, password)

    dispatch(loginUser({ username, password, }))

    event.target.username.value=''
    event.target.password.value=''


    history.push('/')

  }
  return (
    <Box pt={2} pb={2}>
      <form onSubmit={handleLogin} >
        <Box pt={2} pb={2}>
          <div>
            <TextField label='username' name='username' placeholder='username' />

          </div>
          <div>
            <TextField label='password' type='password' name='password' placeholder='password' />

          </div>
        </Box>
        <Button type='submit' variant="contained" color="primary">Login</Button>

      </form>
    </Box>

  )
}

export default UserForm