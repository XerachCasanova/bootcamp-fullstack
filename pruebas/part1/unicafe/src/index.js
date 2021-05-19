import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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


  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={handleGoodClick} >good</button>
        <button onClick={handleNeutralClick} >neutral</button>
        <button onClick={handleBadClick} >bad</button>
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
    
    
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)