const notificationReducer = (state='', action) => {

  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.data

  case 'HIDE_NOTIFICATION':
    return ''

  default:
    return state
  }

}

export const showNotification = (message, type) => {

  return {
    type: 'SHOW_NOTIFICATION',
    data: { message, type }
  }

}

export const hideNotification = () => {

  return {
    type: 'HIDE_NOTIFICATION',
  }

}

let timeoutId

export const setNotification = (message, type, timeout) => {
  return dispatch => {
    const clearMessage = () => {
      timeoutId = setTimeout(() => {
        dispatch(hideNotification())
      },timeout)
    }

    dispatch(showNotification(message, type))
    clearTimeout(timeoutId)
    clearMessage()

  }

}

export default notificationReducer