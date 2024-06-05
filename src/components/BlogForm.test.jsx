import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { createExpect, expect, expectTypeOf } from 'vitest'

test('form is rendered with title, url, and author input elements', async () => {
  const mockSubmit = vi.fn()

  render(<BlogForm handleSubmit={mockSubmit} />)

  const title = screen.getByTestId('blog-form-title-input')
  const url = screen.getByTestId('blog-form-url-input')
  const author = screen.getByTestId('blog-form-author-input')

  expect(title).toBeDefined()
  expect(url).toBeDefined()
  expect(author).toBeDefined()
})

test("form's input elements can be typed into", async () => {
  const mockSubmit = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={mockSubmit} />)

  const titleInput = screen.getByTestId('blog-form-title-input')
  const urlInput = screen.getByTestId('blog-form-url-input')
  const authorInput = screen.getByTestId('blog-form-author-input')

  await user.type(titleInput, 'phantom title')
  await user.type(urlInput, 'phantom url')
  await user.type(authorInput, 'phantom author')

  expect(titleInput.value).toBe('phantom title')
  expect(urlInput.value).toBe('phantom url')
  expect(authorInput.value).toBe('phantom author')
})

test("new blog form's 'submit' event handler is called", async () => {
  const mockSubmit = vi.fn()
  const user = userEvent.setup()
  const inputs = {
    title: 'phantom title',
    author: 'phantom author',
    url: 'phantom url',
  }
  render(<BlogForm handleSubmit={mockSubmit} />)

  const title = screen.getByTestId('blog-form-title-input')
  const url = screen.getByTestId('blog-form-url-input')
  const author = screen.getByTestId('blog-form-author-input')
  const submitButton = screen.getByTestId('blog-form-submit-button')

  await user.type(title, inputs.title)
  await user.type(url, inputs.url)
  await user.type(author, inputs.author)

  await user.click(submitButton)
  const blog = mockSubmit.mock.calls[0][0]

  expect(mockSubmit.mock.calls).toHaveLength(1)
  expect(blog).toEqual(inputs)
})
