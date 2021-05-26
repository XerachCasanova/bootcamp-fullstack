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
<<<<<<< HEAD
    const newPerson =
    {
      name: newName,
      number: newPhone,
    }


    const filter = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (filter.length > 0 && filter[0].number !== newPhone) {

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const changedPerson = { ...filter[0], number: newPhone }

        personsService
          .update(changedPerson.id, changedPerson)

          .then(returnedPerson => {
            setPersons(prevPersons => (prevPersons.map(p => p.id !== filter[0].id ? p : returnedPerson)))

          })
          .catch(error => {
            if (error.response.data.error) {
              const e = error.response.data.error
              setMessagePack([e, MESSAGE_TYPE_ERROR])
              setTimeout(() => { setMessagePack(null) }, 5000)
            } else if (error.response.status === 404) {

              alert(`${filter[0].name} was already deleted from server`)
              setPersons(persons.filter(p => p.id !== filter[0].id))

            }
          })
      }
    } else if (filter.length > 0 && filter[0].number === newPhone) {
=======


    const newPerson = [
      ...persons,
      {
        name: newName,
        phone: newPhone,
      }
    ]
>>>>>>> parent of 85c3156 (terminada parte2)

    const filter = persons.filter(person => person.name === newName)

    if (filter.length > 0) {
      window.alert(`$newName is already added to phonebook`)
    } else if (newName.trim() === "") {
      window.alert("field name cannot be empty")
<<<<<<< HEAD

    } else {

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
          setMessagePack([`Added ${newName} `, MESSAGE_TYPE_ADVICE])
          setTimeout(() => { setMessagePack(null) }, 5000)

        })
        .catch(error => {
          const e = error.response.data.error
          setMessagePack([e, MESSAGE_TYPE_ERROR])
          setTimeout(() => { setMessagePack(null) }, 5000)
        })



=======
>>>>>>> parent of 85c3156 (terminada parte2)
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

<<<<<<< HEAD
  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(
          setMessagePack([`Information of ${person.name} has already been removed from server `, MESSAGE_TYPE_ERROR]),
          setTimeout(() => { setMessagePack(null) }, 5000),
          setPersons(persons.filter(p => p.id != person.id)),

        )
        .catch(error => {
          alert(`${person.name} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== person.id))
        })

    }


  }
=======

>>>>>>> parent of 85c3156 (terminada parte2)

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