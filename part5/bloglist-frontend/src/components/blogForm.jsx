import { useState } from 'react'
import blogService from '../services/blogs'



const BlogForm = ({ setNotification, setBlogs, user, toggler }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogHandler = async (event) => {
    event.preventDefault()
    try{
      blogService.setToken(user.token)
      await blogService.create({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      const newBlogs =  await blogService.getAll()
      setBlogs(newBlogs)
      setNotification({ text: 'Blog has successfully been posted', error : false })
      toggler()
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }catch(err){
      setNotification({ text:'Something went wrong', error : true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }


  return (
    <>
      <form onSubmit={blogHandler}>
        <h3>Make an new blog</h3>
        <div>
          <b>Title:  </b>
          <input
            placeholder='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <b>Author:  </b>
          <input
            placeholder='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <b>Url:  </b>
          <input
            placeholder='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button  placeholder = 'submit' style={{ margin:'15px 20px' }} type='submit'>Create</button>
      </form>
    </>
  )

}

export default BlogForm