import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import {
  Button
} from '@material-ui/core'

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
        <Button variant="contained" color="primary" type="submit" onClick = {toggleVisibility}>{props.buttonLabelHide}</Button>

      </div>
      <div style = {showWhenVisible} >
        {props.children}
        <Button variant="contained" color="primary" type="submit" onClick = {toggleVisibility}>{props.buttonLabelVisible}</Button>

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