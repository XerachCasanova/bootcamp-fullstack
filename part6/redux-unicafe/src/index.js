import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducers/counterReducer'
import {createStore} from 'redux'

const Button = ({handleClick, text}) => <button onClick={() => store.dispatch({type: handleClick})}>{text}</button>



const store = createStore(counterReducer)

const Statistics = () => {
  const statistics = store.getState()
  const good = statistics.good
  const ok = statistics.ok
  const bad = statistics.bad
  const total = good+ok+bad
  
  
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
            <td>{ok}</td>
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


  const textGood='good'
  const textNeutral='neutral'
  const textBad='bad'
  
  
  return (
    <div>

      <h1>give feedback</h1>
      <Button handleClick = 'GOOD' text = {textGood} />
      <Button handleClick = 'OK' text = {textNeutral} />
      <Button handleClick = 'BAD' text = {textBad} />
      <h1>statistics</h1>
      <Statistics  />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)