import React from 'react'
import Course from './components/Course'

const App = ({ courses }) => {


  return (
    <>
    <h1>Web development curriculum</h1>
    {courses.map(course =>
      <Course key={course.id} courses={course} />)}
    </>
  )

}

export default App