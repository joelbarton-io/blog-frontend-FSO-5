import { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleLogin = (e) => {
    e.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input onChange={handleUsernameChange} value={username} />
        </div>
        <div>
          password
          <input
            onChange={handlePasswordChange}
            value={password}
            type="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
