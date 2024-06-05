import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import styles from './Blog.module.css'
import { expect } from 'vitest'

describe('<Blog blog userId blogOps />', () => {
  const blog = {
    id: 'id',
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
      id: 'loggedInUserId',
      name: 'loggedInUserName',
      username: 'loggedInUserUsername',
    },
  }

  const userId = 'userId'

  const blogOps = {
    async like() {},
    async delete() {},
    async create() {},
  }

  test('blog renders title and author but not url or number of likes be default', async () => {
    const { container } = render(
      <Blog blog={blog} userId={userId} blogOps={blogOps} />
    )

    //   const titleAndAuthor = screen.queryByText('title - author')
    //   expect(titleAndAuthor).toBeDefined()

    //   const url = screen.queryByText('url')
    //   expect(url).toBeNull()

    //   const likes = screen.queryByText('0')
    //   expect(likes).toBeNull()

    const titleAuthorByTestId = screen.getByTestId('blog-title-author')
    const titleAuthorByClassName = container.querySelector(
      `.${styles.blogTitle}`
    )
    expect(titleAuthorByTestId).toBeDefined()
    expect(titleAuthorByClassName.textContent).toBe('title - author')

    const url = screen.queryByTestId('blog-url')
    expect(url).toBeNull()

    const likes = screen.queryByTestId('blog-likes')
    expect(likes).toBeNull()
  })

  // doesn't work bc the handler we want to test isn't on the `Blog` component, instead it's on the `div`
  //   test('clicking on blog title element invokes event handler once', async () => {
  //     const mockToggleVisibility = vi.fn()

  //     render(
  //       <Blog blog={blog} userId={userId} blogOps={blogOps}>
  //         <div onClick={mockToggleVisibility}></div>
  //       </Blog>
  //     )

  //     const user = userEvent.setup()
  //     const toggleDetailsDiv = screen.queryByTestId('blog-title-author')
  //     user.click(toggleDetailsDiv)

  //     screen.debug()
  //     expect(mockToggleVisibility.mock.calls).toHaveLength(1)
  //   })

  test('blog renders url and likes after show button is clicked', async () => {
    const { container } = render(
      <Blog blog={blog} userId={userId} blogOps={blogOps} />
    )

    const user = userEvent.setup()
    const toggleDetailsDiv = container.querySelector(`.${styles.blogTitle}`)
    await user.click(toggleDetailsDiv)

    const url = screen.getByTestId('blog-url')
    const likes = screen.getByTestId('blog-likes')

    expect(url).toBeDefined()
    expect(url.textContent).toBe('url url')
    expect(likes).toBeDefined()
    expect(likes.textContent).toBe('0 likes')
  })
})
