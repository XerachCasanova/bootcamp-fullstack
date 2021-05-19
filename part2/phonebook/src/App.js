import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Field from './components/Field'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {

    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
    
  }

  useEffect(hook, [])

  const addPerson = (event) => {

    event.preventDefault()


    const newPerson = [
      ...persons,
      {
        name: newName,
        phone: newPhone,
      }
    ]

    const filter = persons.filter(person => person.name === newName)

    if (filter.length > 0) {
      window.alert(`$newName is already added to phonebook`)
    } else if (newName.trim() === "") {
      window.alert("field name cannot be empty")
    }
    else {
      setPersons(newPerson)
    }

    setNewName('')
    setNewPhone('')

  }

  const handleNameChange = (event) => {

    setNewName(event.target.value)

  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {

    //const personsFilteredByName = filteredByNames.filter(person => person.name === filteredByNames)

    setFilterName(event.target.value)

  }

  let personsFilteredByName


  if (filterName.trim() === '') {

    personsFilteredByName = persons

  } else {

    console.log(filterName)

    personsFilteredByName = persons.filter(person => person.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Field key="filter" label="filter shown with" value={filterName} handleChange={handleFilterChange} />
      <Form action={addPerson}
        fieldHandler={[
          {
            label: 'name',
            value: newName,
            handleChange: handleNameChange
          },
          {
            label: 'phone',
            value: newPhone,
            handleChange: handlePhoneChange
          }

        ]
        } />
      <h2>Numbers</h2>
      <ul>
        {personsFilteredByName.map(person => <Person key={person.name} name={person.name} phone={person.phone} />)}
      </ul>
    </div>
  )
}

export default App