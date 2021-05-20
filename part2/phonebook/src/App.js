import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Person from './components/Person'
import Field from './components/Field'
import Notification from './components/Notification'
import personsService from './services/persons'

const MESSAGE_TYPE_ERROR = 'ERROR'
const MESSAGE_TYPE_ADVICE = 'ADVICE'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')
  const [messagePack, setMessagePack] = useState(null)


  const hookGetAllPersons = () => {

    personsService
      .getAll()
      .then(listPersons => {
        setPersons(listPersons)
      })

  }

  useEffect(hookGetAllPersons, [])

  const addPerson = (event) => {

    event.preventDefault()
    const newPerson = 
      {
        name: newName,
        number: newPhone,
      }

   
    const filter = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())

    if (filter.length > 0 && filter[0].number !== newPhone) {
  
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const changedPerson = {...filter[0], number: newPhone}
        personsService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id!==filter[0].id ? p : returnedPerson))

          })
          .catch(error => {
            alert (`${filter[0].name} was already deleted from server`)
            setPersons(persons.filter( p=> p.id!==filter[0].id))
          })
      }
    } else if (filter.length > 0 && filter[0].number === newPhone)   {

      window.alert(`${newName} is already added to phonebook`)

    } else if (newName.trim() === "") {

      window.alert("field name cannot be empty")

    } else {

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
        setNewPhone('')
        })

        setMessagePack([`Added ${newName} `, MESSAGE_TYPE_ADVICE])
        setTimeout(()=> {setMessagePack(null)}, 5000)

    }

  }

  const handleNameChange = (event) => {

    setNewName(event.target.value)

  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {

    setFilterName(event.target.value)

  }

  let personsFilteredByName


  if (filterName.trim() === '') {

    personsFilteredByName = persons

  } else {

    personsFilteredByName = persons.filter(person => person.name.toLowerCase().indexOf(filterName.toLowerCase()) > -1)

  }

  const deletePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(
          setMessagePack([`Information of ${person.name} has already been removed from server `, MESSAGE_TYPE_ERROR]),
          setTimeout(()=> {setMessagePack(null)}, 5000),
          setPersons(persons.filter(p => p.id != person.id)),
          
        )
        .catch(error => {
          alert (`${person.name} was already deleted from server`)
          setPersons(persons.filter( p=> p.id!==person.id))
        })

    }
    

}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messagePack={messagePack} />
      <Field key="filter" label="filter shown with" value={filterName} handleChange={handleFilterChange} />
      <h2>Add a new Person</h2>
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
        {personsFilteredByName.map(person => <Person key={person.id} person={person} actionDelete={deletePerson} />)}
      </ul>
    </div>
  )
}

export default App