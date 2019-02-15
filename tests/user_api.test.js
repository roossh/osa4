const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./user_test_helper')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.remove({})

    let userObject = new User(helper.initialUsers[0])
    await userObject.save()

    userObject = new User(helper.initialUsers[1])
    await userObject.save()
})

test('cannot add a user with username shorter than 3 characters', async () => {
    const newUser = {
        username: 'hi',
        name: 'i will fail',
        password: 'salasansa3928'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('cannot add a user with password shorter than 3 characters', async () => {
    const newUser = {
        username: 'ThisWillSuffice',
        name: 'I will fail',
        password: 'gg'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('cannot add a user if username exists', async () => {
    const newUser = {
        username: 'RepomiehenRauno',
        name: 'Rauno Repomies',
        password: '598jgiut9uv0vi53i6'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})