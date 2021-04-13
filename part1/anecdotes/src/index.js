import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {

  return (

    <button onClick={handleClick}>{text}</button>

  )

}

const App = (props) => {

  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(props.votes)
  const setToSelected = (random) => {
        
        random = Math.floor(Math.random() * 5);
        setSelected(random)

  }

  const updateVotes = (value) => {
    
    const newVotes = [...votes]

    newVotes[selected] = value
    setVote(newVotes)

  }

  const mostVoted = votes.findIndex(vote => vote === Math.max(...votes))


  return (

    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick = {() => updateVotes(votes[selected]+1)} text='vote' />
      <Button handleClick = {() => setToSelected(selected)} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = new Array(6+1).join('0').split('').map(parseFloat)

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes}/>,
  document.getElementById('root')
)