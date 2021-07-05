import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (commentObject, id) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)


  return response.data

}

export default { create }