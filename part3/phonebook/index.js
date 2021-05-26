require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


morgan.token('person', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}


app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

app.use(express.static('build'))

app.use(express.json())


app.get('/api/persons', (request, response) => {

  Person.find({}).then(persons => {
    response.json(persons)
  })

})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndDelete(request.params.id)
    .then( response.status(204).end() )
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }
  Person.findById(request.params.id).then(personFound => {

    if (!personFound){
      response.status(404).end()
    }

  })


  Person.findOneAndUpdate (
    { _id: request.params.id },
    person,
    { runValidators: true, new:true, context:'query' }
  ).then(updatedPerson => {
    response.json(updatedPerson)
  })
    .catch(error => next(error))

})


app.post('/api/persons', (request, response, next) => {

  const body = request.body


  const person = new Person(
    {
      name: body.name,
      number: body.number
    }
  )

  person.save().then(savedPerson => {

    response.json(savedPerson)
  })
    .catch(error => next(error))


})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})