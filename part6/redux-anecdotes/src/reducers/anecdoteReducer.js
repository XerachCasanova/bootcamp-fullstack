import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteOf = (id) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(id)
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'SET_VOTE',
      data: anecdotes
    })
  }

}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      const newState = action.data.map(anecdote => anecdote)
      return newState.sort((a,b) => b.votes - a.votes)

    case 'CREATE_ANECDOTE':
      return [...state, action.data]
 
    case 'SET_VOTE': {

      const newState = action.data.map(anecdote => anecdote)
      return newState.sort((a,b) => b.votes - a.votes)
    }
      
    default:
      return state
  }  
}



export default anecdoteReducer