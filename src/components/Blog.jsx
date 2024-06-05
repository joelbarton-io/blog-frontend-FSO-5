import { useState } from 'react'
import styles from './Blog.module.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogOps, userId }) => {
  const [visible, setVisible] = useState(false)

  const likeBlog = (e) => {
    e.preventDefault()
    blogOps.like(blog)
  }

  const deleteBlog = (e) => {
    e.preventDefault()
    const userConfirmDelete = window.confirm(
      `Delete blog: ${blog.title} by ${blog.author}?`
    )
    if (!userConfirmDelete) return
    blogOps.delete(blog.id)
  }

  const userOwnsBlog = () => blog.user === userId

  const toggleVisibility = () => setVisible((prev) => !prev)

  const titleAndAuthor = () => (
    <div className={styles.blogTitle} onClick={toggleVisibility}>
      {blog.title} - {blog.author}
    </div>
  )

  const allDetails = () => {
    return (
      <article className={styles.blogDetails}>
        <div className={styles.blogTitle} onClick={toggleVisibility}>
          {blog.title}
        </div>
        <div>
          <b>url</b> {blog.url}
        </div>
        <div>
          <b>user</b> {blog.user.name}
        </div>
        <div>
          {blog.likes} <b>likes</b>{' '}
          <button onClick={likeBlog} className={styles.likeButton}>
            like
          </button>
          {userOwnsBlog ? (
            <button onClick={deleteBlog} className={styles.deleteButton}>
              delete
            </button>
          ) : null}
        </div>
      </article>
    )
  }
  return (
    <div className={styles.blogContainer}>
      {visible ? (
        <article className={styles.blogDetails}>
          <div
            className={styles.blogTitle}
            onClick={toggleVisibility}
            data-testid="blog-title-author"
          >
            {blog.title} - {blog.author}
          </div>
          <div data-testid="blog-url">
            <b>url</b> {blog.url}
          </div>
          <div>
            <b>user</b> {blog.user.name}
          </div>
          <div data-testid="blog-likes">
            {blog.likes} <b>likes</b>{' '}
            <button onClick={likeBlog} className={styles.likeButton}>
              like
            </button>
            {userOwnsBlog ? (
              <button onClick={deleteBlog} className={styles.deleteButton}>
                delete
              </button>
            ) : null}
          </div>
        </article>
      ) : (
        <div
          className={styles.blogTitle}
          onClick={toggleVisibility}
          data-testid="blog-title-author"
        >
          {blog.title} - {blog.author}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
  }),
  blogOps: PropTypes.shape({
    like: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
  }),
  userId: PropTypes.string.isRequired,
}
export default Blog
