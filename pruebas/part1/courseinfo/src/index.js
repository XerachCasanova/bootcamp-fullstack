import React from 'react';
import ReactDOM from 'react-dom';

const Header=(props) =>{

  return (

    <h1>{props.course}</h1>

  )

}

const Content=(props) =>{
  return (
    <>
    {
    props.parts.map((part, index) =><p key={index}>{part.name} {part.exercises}</p>)
    }
    </>
  )

}

const Total=(props) => {
  const exercises = props.parts.map(part => part.exercises)
  const reducer = (acc, current) => acc + current
  const totalExercises = exercises.reduce(reducer)
  return(

    <p>Number of exercises {totalExercises} </p>

  )
  

}

const App=() => {
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
        name: 'State of component',
        exercises: 10
  
      },
  
    ]
  }
  

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />
    </div>

    )
}

ReactDOM.render(<App />, document.getElementById('root'))