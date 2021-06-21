import React from 'react'
import {voteOf} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import {connect} from 'react-redux'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteOf(anecdote.id)
    props.setNotification(`you voted '${anecdote.content}'`, 5000)

  }
  
  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  
  return state.filter ===''
  ? { anecdotes: state.anecdotes  }
  : { anecdotes: 
      state.anecdotes.filter(a => 
        a.content.toLowerCase().indexOf(state.filter.toLowerCase()) > -1
      )}
}

const mapDispatchToProps = {
  voteOf,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes