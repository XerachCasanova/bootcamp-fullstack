import React from 'react'
import { connect } from 'react-redux'
import {filterAnecdote} from '../reducers/filterReducer'

const FilterAnecdote = (props) => {


  const handleFilter = (event) => {
    props.filterAnecdote(event.target.value)
  }

  const style = {
    marginBottom: 10
  }


  return (
    <div style={style}>
      filter <input name='filter' onChange = {handleFilter}/>
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdote,
}

const connectedFilterAnecdote = connect(
  null,
  mapDispatchToProps,
)(FilterAnecdote)
export default connectedFilterAnecdote