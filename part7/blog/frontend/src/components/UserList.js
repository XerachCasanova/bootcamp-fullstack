import React from 'react'
import {
  Box,
  Typography,
  Table,
  TableHead,
  Link as MLink,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

import {
  Link
} from 'react-router-dom'

import { useSelector } from 'react-redux'

const UserList = () => {

  //const match = useRouteMatch()

  //console.log('valor de match', match)


  const users = useSelector(state => state.users)

  return (

    <Box>
      <Box pt={2} pb={2}>
        <Typography variant="h3">
          Users
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.id}>
                <TableCell><MLink component={Link} to={`/users/${user.id}`}>{user.username}</MLink></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </TableContainer>
    </Box>
  )

}

export default UserList