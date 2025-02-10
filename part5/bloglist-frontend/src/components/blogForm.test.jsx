/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BlogForm from './blogForm'


test('Event handler with right details is called on submit', async () => {
  const clicker = userEvent.setup()
  const blogHandler =  vi.fn()

  render(<BlogForm  handleSubmit={blogHandler} />)
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('Create')

  const testData = {
    title: 'Test title',
    author: 'Test author',
    url: 'testurl.com'
  }

  await clicker.type(title, testData.title )
  await clicker.type(author, testData.author)
  await clicker.type(url, testData.url)
  await clicker.click(submitButton)
  expect(blogHandler.mock.calls).toHaveLength(1)
  expect(blogHandler.mock.calls[0][0].title).toBe(testData.title)
  expect(blogHandler.mock.calls[0][0].author).toBe(testData.author)
  expect(blogHandler.mock.calls[0][0].url).toBe(testData.url)


})
