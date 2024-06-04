import { useState } from 'react'
import styles from './Blog.module.css'

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false)

  const likeBlog = (e) => {
    e.preventDefault()
    handleLike(blog)
  }

  const toggleVisibility = () => setVisible((prev) => !prev)

  const justTitle = () => (
    <div className={styles.blogTitle} onClick={toggleVisibility}>
      {blog.title}
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
            Like
          </button>
        </div>
      </article>
    )
  }
  return (
    <div className={styles.blogContainer}>
      {visible ? allDetails() : justTitle()}
    </div>
  )
}

export default Blog
