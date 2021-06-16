import React from 'react'
const Notification = (props) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (props.type === 'ERROR') notificationStyle.color = 'red'
  if (props.type === 'DONE') notificationStyle.color = 'green'

  if (props.message === null) {
    return null
  }

  return (
    <div className="message" style={notificationStyle}>
      {props.message}
    </div>
  )

}


export default Notification