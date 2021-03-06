import React, {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../queries'

const LoginForm = ({show, setToken, setPage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value
      setToken(token)
      setPage('authors')
 
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) //eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: {
      username,
      password
      }
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password <input type='password' onChange={({target}) => setPassword(target.value)}  />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm