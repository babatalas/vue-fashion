const request = require('supertest')
const app = require('../server')
const {sequelize} = require('../models')
const { queryInterface } = sequelize

afterAll((done) => {
  queryInterface
  .bulkDelete('Users', null, {})
  .then(() => {
    done()
  })
  .catch(err => done(err))
})

describe('Special route for login and register', () => {
  const user = {
    firstName: 'User',
    lastName: 'Pertama',
    email: 'demo@demo.io',
    password: 'usedemo'
  }
  describe('POST /register', () => {
    test('Good request response with json, status(201)', (done) => {
      request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(201)
        expect(body.id).toBeTruthy()
        expect(body.firstName).toBe(user.firstName)
        expect(body.lastName).toBe(user.lastName)
        expect(body.email).toBe(user.email)
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('POST /register', () => {
    test('Bad request Email already used response with json, status(400)', (done) => {
      request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(400)
        expect(body.status).toBe('fail')
        expect(body.errorCode).toBe('EMAIL_ALREADY_USED')
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('POST /login', () => {
    test('Good request response with json, status(200)', (done) => {
      request(app)
      .post('/login')
      .send({email: user.email, password: user.password})
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body.id).toBeTruthy()
        expect(body.email).toBe(user.email)
        expect(body.firstName).toBe(user.firstName)
        expect(body.lastName).toBe(user.lastName)
        expect(body.access_token).toBeTruthy()
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('POST /login', () => {
    test('Bad request invalid email and/or password response with json, status(401)', (done) => {
      request(app)
      .post('/login')
      .send({email: user.email, password: ''})
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(401)
        expect(body.status).toBe('fail')
        expect(body.errorCode).toBe('INVALID_LOGIN_DETAIL')
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
})
// NODE_ENV=test npm test