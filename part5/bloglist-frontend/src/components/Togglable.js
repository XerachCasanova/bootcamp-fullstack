import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (

    <div>
      <div style = {hideWhenVisible}>
        <button onClick = {toggleVisibility} >{props.buttonLabelHide}</button>
      </div>
      <div style = {showWhenVisible} >
        {props.children}
        <button onClick = {toggleVisibility}  >{props.buttonLabelVisible}</button>
      </div>
    </div>

  )

})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {

  buttonLabelHide: PropTypes.string.isRequired,
  buttonLabelVisible: PropTypes.string.isRequired
}

export default Togglable