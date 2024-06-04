import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const TIME_OUT = 3000
  const loginFormRef = useRef()
  const blogFormRef = useRef()
  // const singleBlogRef = useRef()

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      console.log(blogs)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('loggedInBlogUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const mainPage = () => (
    <main>
      <div>
        <h2>
          current user is <i>{user.name}</i>
        </h2>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <h2>Blogs</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleLike={likeBlog} />
      ))}
    </main>
  )

  const login = async (credentials) => {
    try {
      //   loginFormRef.current.toggleVisibility()
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))
      setUser(user)
      setMessage(`successful login for: ${user.username}`)
      setTimeout(() => setMessage(null), TIME_OUT)
    } catch (exception) {
      setMessage(exception.response.data.error)
      setTimeout(() => setMessage(null), TIME_OUT)
    }
  }

  const logout = (e) => {
    // what about something on the server??
    console.log('logging out...')
    // e.preventDefault
    setMessage(`${user.name} was successfully logged out`)
    setUser(null)
    window.localStorage.clear()
    setTimeout(() => setMessage(null), TIME_OUT)
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(newBlog)
      setBlogs((prevBlogs) => prevBlogs.concat(blog))
      setMessage(`a new blog ${blog.title} by ${blog.author} was added`)
      setTimeout(() => setMessage(null), TIME_OUT)
    } catch (exception) {}
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm handleSubmit={login}></LoginForm>
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={createBlog}></BlogForm>
      </Togglable>
    )
  }

  const likeBlog = async (blog) => {
    try {
      blogService.setToken(user.token)
      const data = await blogService.update(blog)
    } catch (exception) {
      console.error(exception)
    }
  }
  return (
    <>
      <Notification message={message} />
      <h1>Blog App</h1>
      {user ? mainPage() : loginForm()}
    </>
  )
}

export default App
