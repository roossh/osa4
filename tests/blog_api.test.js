const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.remove({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(2)
      
})

test('check that correct formatting is used for id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('check that it is possible to add blogs using HTTP POST', async () => {
    const newBlog = {
        title: 'Sending a POST request',
        author: 'Async Await',
        url: 'blogurl.blog',
        likes: 0
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(3)
})

test('check that if likes is undefined, it is automatically set to 0', async () => {
    const newBlog = {
        title: 'Fishing for likes',
        author: 'Async Await',
        url: 'blogurl.blog'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

test('check that if title and url are undefined, request gets code 400', async () => {
    const newBlog = {
        author: 'I have made some mistakes'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})