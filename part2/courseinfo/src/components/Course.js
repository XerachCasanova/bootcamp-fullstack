import React from 'react'
import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({ courses }) => {

    return (

        <>
            <Header course={courses.name} />
            <ul>
                {courses.parts.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>

            <Total parts={courses.parts} />
        </>
    )

}


export default Course