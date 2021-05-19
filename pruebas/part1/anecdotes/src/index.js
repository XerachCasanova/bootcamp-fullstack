import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState( points )

  const vote = () => {

    const copyVotes = [
      ...votes
      
    ]
    
    copyVotes[selected] = copyVotes[selected] + 1
    return setVotes(copyVotes)

  }

  const nextAnecdote = () => {

    const newAnecdote = Math.floor(Math.random() * 6)

    return setSelected(newAnecdote)
  }

  const mostVoted = votes.findIndex(vote => vote === Math.max(...votes))


  return (

    <div>
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes
      <p>
        <button onClick = {vote}>vote</button>
        <button onClick = {nextAnecdote}>next anecdote</button>
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVoted]}</p>
    </div>
  )
}

const points = [0,0,0,0,0,0]

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById('root')
)