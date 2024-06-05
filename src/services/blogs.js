import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const { data: blogs } = await axios.get(baseUrl)
  return blogs
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const { data: blog } = await axios.post(baseUrl, newBlog, config)
  return blog
}

const update = async (blog) => {
  const url = `${baseUrl}/${blog.id}`

  const data = {
    likes: blog.likes,
    user: blog.user.id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
  }

  const config = {
    headers: { Authorization: token },
  }

  const { data: updatedBlog } = await axios.put(url, data, config)
  return { ...updatedBlog, user: blog.user, id: blog.id }
}

const deleteById = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(url, config)
}
export default { setToken, getAll, create, update, deleteById }
