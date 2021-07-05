import axios from 'axios'
const baseUrl = '/api/blogs'


let token

const setToken = (newToken) => {

  token = `bearer ${newToken}`

}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async blogObject => {

  const config =
    { headers:
      { Authorization:  token }
    }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data

}

const update = async (blogObject, id) => {

  const config =
    { headers:
      { Authorization: token }
    }

  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)

  return response.data
}

const remove = async (id) => {
  const config =
    { headers:
      { Authorization: token }
    }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, getOneById, create, update, remove, setToken }