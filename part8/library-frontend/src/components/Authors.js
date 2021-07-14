  
import React, {useState} from 'react'
import {SET_BIRTHYEAR} from '../queries'
import {useMutation} from '@apollo/client'
import Select from 'react-select'

const BornForm = ({authors}) => {

  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [setBirthyear] = useMutation(SET_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()

    setBirthyear({variables: {name: name.value, born: Number(born)}})
    setBorn('')
    setName(null)
    
  }

  /* using select tag:
  <div>
      name
      <select onChange={({target}) => setName(target.value)}>
        {authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
      </select>
  </div>
  */
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit} >
      
      <div>
        <Select 
          value={name}
          onChange={setName}
          options= {authors.map(author => ({value: author.name, label: author.name}))}
        />
      </div>
      <div>
        born <input  type='number' value={born} onChange={({target}) => setBorn(target.value)}/>
      </div>
      <button type="submit">update author</button>
        
      </form>
    </div>
  )

}


const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
     <BornForm authors={authors} />
    </div>
  )
}

export default Authors
