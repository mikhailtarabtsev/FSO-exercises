const {test, describe, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


beforeEach( async () =>{
 try{ await Blog.deleteMany({});
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

test.only('Id matches with the database', async ()=>{
  const newBlog = new Blog({
    title: 'Funniest thing',
    author: 'Pickle Rick',
    url: 'localhost:3001',
    likes: 5})

  await newBlog.save()
  const savedBlogs = await listHelper.blogsDb()
  
  assert(!savedBlogs[6].hasOwnProperty('_id'))

  
})

test('Post request works correctly', async ()=>{
  const db = await Blog.find({})
  const newBlog = new Blog({
  title: 'Funniest thing',
  author: 'Pickle Rick',
  url: 'localhost:3001',
  likes: 5})

  await api
    .post('/api/blogs')
    .send(newBlog.toJSON())
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedDb = await Blog.find({})

  assert.strictEqual(updatedDb.length, db.length + 1)
})


test('Missing likes become 0', async ()=>{
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

after( async()=>{
  await mongoose.connection.close()
})