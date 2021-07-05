import React from 'react'
import { useSelector } from 'react-redux'

import { Alert  } from '@material-ui/lab'
import { Box } from '@material-ui/core'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  let severity

  if (notification.type === 'ERROR') severity = 'error'
  if (notification.type === 'DONE') severity = 'success'

  if (notification === null) return null

  return (
    <Box pt={2} pb={2}>
      {(notification && <Alert severity={severity}>
        {notification.message}
      </Alert>
      )}
    </Box>



  )

}


export default Notification
