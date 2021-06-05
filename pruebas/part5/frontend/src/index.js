import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'

axios
  .get('http://localhost:3001/notes')
  .then(response => {
  const notes = response.data
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
})




