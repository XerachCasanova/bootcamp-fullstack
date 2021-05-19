import React from 'react'

const Total = ({ parts }) => {

    const exercises = parts.map(part => part.exercises)

    const total = exercises.reduce((a, b) => a + b)

    return (

        <p><strong>Total of {total} exercises</strong></p>

    )

}

export default Total