import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {

  return <h1>{props.course}</h1>


}

const Content = (props) => {

  const names = props.parts.map(value => value.name)
  const exercises = props.parts.map(value => value.exercises)
  return (
    <>
      <p>{names[0]} {exercises[0]}</p>
      <p>{names[1]} {exercises[1]}</p>
      <p>{names[2]} {exercises[2]}</p>
    </>

  )

}

const Total = (props) => {

  const exercises = props.total.map(value => value.exercises)

  return (

    <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>

  )


}

const App = () => {


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10

      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14

      }
    ]
  }


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts} />
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))