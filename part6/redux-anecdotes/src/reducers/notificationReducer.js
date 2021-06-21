
const showNotification = (message) => {
  
  return {
    type: 'SHOW_NOTIFICATION',
    data: message

  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

let timeoutId

export const setNotification = (message, timeout) => {
  return async dispatch => {
    
    const clearMessage = () =>{
      timeoutId = setTimeout(() => {
        dispatch(hideNotification())
      },timeout)
    }
    
    dispatch(showNotification(message))
    clearTimeout(timeoutId)
    clearMessage()
    
  }

}

const notificationReducer = (state = '', action) => {

  switch(action.type) {
    case 'SHOW_NOTIFICATION':{
      return action.data
    }
      
    case 'HIDE_NOTIFICATION':
      return ''
    
    default:
      return state
  }
}

export default notificationReducer