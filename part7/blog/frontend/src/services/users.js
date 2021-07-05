import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {

  const response = await axios.get(baseUrl)

  return response.data
}

const getOneByUsername = async (username) => {
  const response = await axios.get(baseUrl)

  return response.data.find(user => user.username === username)

}

export default { getAll, getOneByUsername }