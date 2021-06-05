const Notification = ({messagePack}) => {
    
    
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
  }

  if (messagePack === null) {
      

      return null

  }

  const [message, messageType] = messagePack
  
  if (messageType === "ERROR") notificationStyle.color = "red"
  if (messageType === "ADVICE") notificationStyle.color = "green"

  
  return (

      <div style={notificationStyle}>
          {message}
      </div>

  )

}

export default Notification