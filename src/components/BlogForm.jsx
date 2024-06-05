import { useState } from 'react'
import PropTypes from 'prop-types'

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
      <form data-testid="blog-form" onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            data-testid="blog-form-title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            data-testid="blog-form-author-input"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            data-testid="blog-form-url-input"
            value={url}
            onChange={handleUrlChange}
          />
        </div>

        <button data-testid="blog-form-submit-button" type="submit">
          Create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default BlogForm
