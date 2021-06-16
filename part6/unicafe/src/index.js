import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const Statistics = ({good, neutral, bad}) => {

  const total = good+neutral+bad
  
  
  if (total === 0){

    return (

      <p>No feedback given</p>

    )

  }


  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{(good-bad)/total}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{(good/total)*100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const setToGood = newValue => {
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  const textGood='good'
  const textNeutral='neutral'
  const textBad='bad'
  
  return (
    <div>

      <h1>give feedback</h1>
      <Button handleClick = {() => setToGood(good + 1)} text = {textGood} />
      <Button handleClick = {() => setToNeutral(neutral +1)} text = {textNeutral} />
      <Button handleClick = {() => setToBad(bad+1)} text = {textBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)