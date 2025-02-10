/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id:1,
    title: 'test blog',
    author: 'Test author',
    url: 'test test',
    user : {
      id:2,
      name: 'testuser',
      username: 'user',
    },
    likedBy:[0,1,2,3,4]

  }

  const user = {
    username: 'test',
    name: 'Test test',
    blogs: [1,2,3],
    likes: [1,2,4,5]
  }
  const setBlogs = () => { return 1}

  render(<Blog blog={blog} user ={user} setBlogs={setBlogs} />)
  const element = screen.getByText(blog.title, { exact : false })
  const missingUrl = screen.queryByText(blog.url)
  const missingLikes = screen.queryByText(` ${blog.likedBy.length} likes`)

  expect(element).toBeDefined()
  expect(missingUrl).toBeNull()
  expect(missingLikes).toBeNull()
})


test('expand button shows contents', async () => {
  const blog = {
    id:1,
    title: 'test blog',
    author: 'Test author',
    url: 'test test',
    user : {
      id:2,
      name: 'testuser',
      username: 'user',
    },
    likedBy:[0,1,2,3,4]

  }

  const user = {
    username: 'test',
    name: 'Test test',
    blogs: [1,2,3],
    likes: [1,2,4,5]
  }
  const setBlogs = () => { return 1}

  render(<Blog blog={blog} user ={user} setBlogs={setBlogs} />)
  const clicker = userEvent.setup()
  const button = screen.getByText('View')
  await clicker.click(button)
  const missingUrl = screen.queryByText(blog.url)
  const missingLikes = screen.queryByText(` ${blog.likedBy.length} likes`)
  expect(missingUrl).toBeDefined()
  expect(missingLikes).toBeDefined()
})

test('like button clicked twice calls event handler twice', async () => {
  const blog = {
    id:1,
    title: 'test blog',
    author: 'Test author',
    url: 'test test',
    user : {
      id:2,
      name: 'testuser',
      username: 'user',
    },
    likedBy:[0,1,2,3,4]

  }

  const user = {
    username: 'test',
    name: 'Test test',
    blogs: [1,2,3],
    likes: [0,2,4,5]
  }
  const setBlogs = () => { return 1}
  const likeHandler = vi.fn()
  render(<Blog blog={blog} user ={user} setBlogs={setBlogs} likeHandler={likeHandler} />)
  const clicker = userEvent.setup()
  const viewButton = screen.getByText('View')
  await clicker.click(viewButton)
  const likeButton = screen.getByText('Like')
  await clicker.click(likeButton)
  await clicker.click(likeButton)
  expect(likeHandler.mock.calls).toHaveLength(2)



})
