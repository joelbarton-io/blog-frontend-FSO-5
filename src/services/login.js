import axios from 'axios'
const baseUrl = 'api/login'

const login = async (credentials) => {
  const { data: user } = await axios.post(baseUrl, credentials)
  return user
}

// const logout = async () => {
//     const
// }

export default {
  login,
  //   logout,
}
