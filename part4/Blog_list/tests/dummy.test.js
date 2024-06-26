const {test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')


beforeEach( async () =>{
 try{
  await Blog.deleteMany({});
  await User.deleteMany({});
  const newUser =  {
    username : "Pickle Rick",
    passwordHash : "Booger-Aids11",
    name : "Rick Sanchez"
  }
  const initialUser = new User (newUser)
  await initialUser.save()
  for (let i = 0; i < listHelper.blogs.length; i++){
    let initialBlogs = new Blog(listHelper.blogs[i])
    await initialBlogs.save()
  }}
  catch(err){next(err)}
})

test('dummy test returns 1', ()=> {

    const result = listHelper.dummy(listHelper.blogs)
    assert.strictEqual(result, 1)
})
describe('total likes', ()=>{
        test('with one blog', () => {
            const oneBlog = [listHelper.blogs[0]]
            const result = listHelper.totalLikes(oneBlog)
            assert.strictEqual(result, 7)
        })
        test('empty is zero', ()=>{
            const empty = [];
            const result = listHelper.totalLikes(empty)
            assert.strictEqual(result, 0)
        })
        test('full list is total', ()=>{
            const result = listHelper.totalLikes(listHelper.blogs)
            assert.strictEqual(result, 36)
        })
    })

test('favourite blog', ()=>{
    const result = listHelper.favBlog(listHelper.blogs)
    assert.deepEqual(result, listHelper.blogs[2])
})
describe('most', ()=>{
    test('blogs', ()=>{
      const testValue = {
        name: "Robert C. Martin",
        blogs: 3
      }
      const result = listHelper.mostBlogs(listHelper.blogs)
      assert.deepEqual(result, testValue)
    })

    test('likes', ()=>{
      const testValue = {
        author: "Edsger W. Dijkstra",
        likes: 17
      }

      const result = listHelper.mostLikes(listHelper.blogs)
      assert.deepEqual(result, testValue)
    })
})

test('Get request returns JSON data with correct length', async()=>{
  try {
    const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, 6)}
  catch (err){next (err)}
} )

test('Id matches with the database', async ()=>{
  const newBlog = new Blog({
    title: 'Funniest thing',
    author: 'Pickle Rick',
    url: 'localhost:3001',
    likes: 5})

  await newBlog.save()
  const savedBlogs = await listHelper.blogsDb()
  
  assert(!savedBlogs[6].hasOwnProperty('_id'))

  
})

test.only('Post request works correctly', async ()=>{
  const db = await Blog.find({})

  const users = await User.find({})

  const user = users[0]
  const userForToken = {
    username : user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  const newBlog = new Blog({
  title: 'Funniest thing',
  author: 'Pickle Rick',
  url: 'localhost:3001',
  likes: 5})

  await api
    .post('/api/blogs')
    .send(newBlog.toJSON())
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedDb = await Blog.find({})

  assert.strictEqual(updatedDb.length, db.length + 1)
})

test.only('Post request without token gets correctly rejected', async ()=>{
  const db = await Blog.find({})

  const newBlog = new Blog({
    title: 'Funniest thing',
    author: 'Pickle Rick',
    url: 'localhost:3001',
    likes: 5})
  
    await api
      .post('/api/blogs')
      .send(newBlog.toJSON())
      .expect(401)
      .expect('Content-Type', /application\/json/)
  
    const updatedDb = await Blog.find({})
  
    assert.strictEqual(updatedDb.length, db.length)

})
describe('Missing', ()=>{
  test('likes become 0', async ()=>{
    const db = await Blog.find({})
    const newBlog = new Blog({
    title: 'Funniest thing',
    author: 'Pickle Rick',
    url: 'localhost:3001'
   })
  
    await api
    .post('/api/blogs')
    .send(newBlog.toJSON())
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const updatedDb = await Blog.find({})
  console.log(updatedDb)
  assert.strictEqual(updatedDb[6].likes, 0)
  })

  test('title gives 400', async () =>{
    const newBlog = new Blog({
      author: 'Pickle Rick',
      url: 'localhost:3001',
      likes: 5})
  
    await api.post('/api/blogs')
        .send(newBlog.toJSON())
        .expect(400)
  })
  
  test('URL gives 400', async () =>{
    const newBlog = new Blog({
      title: 'Funniest thing',
      author: 'Pickle Rick',
      likes: 5})
    await api
      .post('/api/blogs')
      .send(newBlog.toJSON())
      .expect(400)
  })
})

test('deleting a note works', async () =>{
  const blogsInDb = await Blog.find({})
  const blogs = blogsInDb.map(blog => blog.toJSON())
  const blogToDelete = blogs [0]
  const idToDelete = blogToDelete.id
  
  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)

  const blogsDb = await Blog.find({})
  const titles = blogsDb.map(blog => blog.title )
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsDb.length, listHelper.blogs.length-1)
  
})

test('Updating the blog works', async () =>{
  const blogToUpdate = listHelper.blogs[0]
  const idToUpdate = blogToUpdate._id
  const updatedBlog = {
    title: 'Funniest thing',
    author: 'Pickle Rick'
  }

    await api
      .put(`/api/blogs/${idToUpdate}`)
      .send(updatedBlog)
      .expect(200)

  const blogsDb = await Blog.find({})
  const putAuthor = blogsDb.map(blog => blog.author)
  const putTitle = blogsDb.map(blog => blog.title)
    assert(putAuthor[0].includes(updatedBlog.author))
    assert(putTitle[0].includes(updatedBlog.title))
})

describe ('User', () =>{
  test('data submission works', async () =>{
    const dbAtStart = await listHelper.usersInDb() 
    const newUser =  {
      username : "Pickle Rick",
      password : "Booger-Aids11",
      name : "Rick Sanchez"
    }
    

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const dbAtEnd = await listHelper.usersInDb()
    assert.strictEqual(dbAtEnd.length, dbAtStart.length + 1 )
    
  })
  test('password of insufficient length is rejected', async () =>{
    
    const newUser =  {
      username : "Pickle Rick",
      password : "Boo",
      name : "Rick Sanchez"
    }

    const response = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
    
    const dbAtEnd = await listHelper.usersInDb()
    assert(response.body.error.includes('Minimum required password length is 3 characters'))
    assert.strictEqual(dbAtEnd.length, 0)
  })

  test('name of insufficient length is rejected', async () =>{
    const newUser =  {
      username : "Pi",
      password : "Booger-aids11",
      name : "Rick Sanchez"
    }

    const response = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
    
    const dbAtEnd = await listHelper.usersInDb()
    assert(response.body.error.includes('Username needs to be at least 3 characters long'))
    assert.strictEqual(dbAtEnd.length, 0)
  })
 
test('names that are non-unique are rejected', async ()=>{
  const newUser =  {
    username : "Pickle Rick",
    passwordHash : "Booger-Aids11",
    name : "Rick Sanchez"
  }
  const initialUser = new User (newUser)
  await initialUser.save()

  const anotherUser = {
    username: "Pickle Rick",
    password: "RickAndMorty",
    name:"Morty Smith"

  }
  await api
    .post('/api/users/')
    .send(anotherUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const dbAtEnd = await listHelper.usersInDb()
  assert.strictEqual(dbAtEnd.length, 1 )
  

})
})
after( async()=>{
  await mongoose.connection.close()
})