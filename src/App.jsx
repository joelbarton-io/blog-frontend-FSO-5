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

  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const currentUser = window.localStorage.getItem('loggedInBlogUser')

    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }

    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    fetchBlogs()
  }, [])

  const blogOps = {
    async like(blog) {
      try {
        blogService.setToken(user.token)
        const updatedBlog = await blogService.update(blog)

        setBlogs((pb) =>
          pb.map((b) => {
            return b.id === updatedBlog.id ? updatedBlog : b
          })
        )
      } catch (exception) {
        console.error(exception.response.data)
      }
    },
    async delete(id) {
      try {
        blogService.setToken(user.token)
        await blogService.deleteById(id)
        setBlogs((pb) => pb.filter((blog) => blog.id !== id))
      } catch (exception) {
        console.error(exception.response.data)
      }
    },
    async create(newBlog) {
      try {
        blogFormRef.current.toggleVisibility()
        blogService.setToken(user.token)
        const blog = await blogService.create(newBlog)
        setBlogs((prevBlogs) => prevBlogs.concat(blog))
        setMessage(`a new blog ${blog.title} by ${blog.author} was added`)
        setTimeout(() => setMessage(null), TIME_OUT)
      } catch (exception) {
        console.error(exception.response.data)
      }
    },
  }

  const loginForm = () => {
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
    return (
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm handleSubmit={login}></LoginForm>
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm handleSubmit={blogOps.create}></BlogForm>
      </Togglable>
    )
  }

  const mainPage = () => {
    const logout = (e) => {
      // what about something on the server??
      console.log('logging out...')
      // e.preventDefault
      setMessage(`${user.name} was successfully logged out`)
      setUser(null)
      window.localStorage.clear()
      setTimeout(() => setMessage(null), TIME_OUT)
    }

    return (
      <main>
        <div>
          <h2>
            current user is <i>{user.name}</i>
            {JSON.stringify(user)}
          </h2>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>

        <h2>Blogs</h2>
        {blogForm()}
        {blogs
          .sort(({ likes: a }, { likes: d }) => d - a)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              blogOps={blogOps}
              userId={user.id}
            />
          ))}
      </main>
    )
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
