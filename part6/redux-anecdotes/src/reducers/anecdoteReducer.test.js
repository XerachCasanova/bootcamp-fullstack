import deepfreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('AnecdoteReducer', () => {

  let state

  beforeEach(() => {
    state = [

      {
        content: 'anecdote 1',
        id: '1',
        votes: 0
      },
      {
        content: 'anecdote 2',
        id: '2',
        votes: 0
      },
      {
        content: 'anecdote 3',
        id: '3',
        votes: 0
      }

    ]

  })

  test('anecdotes initializes', () => {

    const action = {
      type: 'INIT_ANECDOTES',
      data: state
    }
    deepfreeze(state)
    const newState=anecdoteReducer(state, action)
 
    expect(newState).toHaveLength(3)
  })

  test('anecdotes vote is added correctly', () => {
    
    const action = {
      type: 'SET_VOTE',
      data: {id: 2}
    }

    deepfreeze(state)

    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(3)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
      content: 'anecdote 2',
      id: '2',
      votes: 0
    })


  })
})