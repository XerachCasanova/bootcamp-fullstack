import React, { useState } from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ login }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    login(
      {
        username: username,
        password: password
      }
    )


    setUsername('')
    setPassword('')

  }


  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type='submit'>login</button>
      </form>
    </div>
  )

}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm