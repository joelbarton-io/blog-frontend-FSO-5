import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const handleCreateBlog = (e) => {
    e.preventDefault()
    handleSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author
          <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url
          <input value={url} onChange={handleUrlChange} />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default BlogForm
