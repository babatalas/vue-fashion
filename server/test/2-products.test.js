const request = require('supertest')
const app = require('../server')
const {sequelize, User, Product} = require('../models')
const { queryInterface } = sequelize
const admin = {
  firstName: 'User',
  lastName: 'Pertama',
  email: 'demo@demo.io',
  password: 'usedemo'
}
const user = {
  firstName: 'User',
  lastName: 'Kedua',
  email: 'demo2@demo.io',
  password: 'usedemo'
}
const newProduct = {
  "name": "Low Rising Short Sleeve Tee Id",
  "description": "Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
  "price": 350000,
  "stock": 199,
  "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
}
const editedProduct = {
  "name": "Updated product name Low Rising Short Sleeve Tee Id",
  "description": "Updated product description Kaos detail back print untuk casual beach wear\r\nWarna putih\r\nKerah bulat\r\nUnlined\r\nRegular fit",
  "price": 350000,
  "stock": 199,
  "imageUrl": "https://dynamic.zacdn.com/DpjTTOOmzIasmKJ5Ctm5XnRS5PU=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.id.zalora.net/p/quiksilver-8536-9933232-1.jpg"
}
let loggedInAdmin, loggedInUser

afterAll((done) => {
  queryInterface
  .bulkDelete('Products', null, {})
  .then(result => {
    return queryInterface.bulkDelete('Users', null, {})
  })
  .then(() => {
    done()
  })
  .catch(err => done(err))
})

beforeAll((done) => {
  return User.create(admin)
  .then(result => {
    return User.update({
      RoleId: 1
    }, {where: {
      email: admin.email
    }})
  })
  .then(result => {
    return User.create(user)
  })
  .then(result => {
    return request(app)
    .post('/login')
    .send({email: user.email, password: user.password})
    .set('Accept', 'application/json')
  })
  .then(response => {
    const {body} = response
    loggedInUser = body
    return request(app)
    .post('/login')
    .send({email: admin.email, password: admin.password})
    .set('Accept', 'application/json')
  })
  .then(response => {
    const {body} = response
    loggedInAdmin = body
  })
  .then(() => done())
  .catch(err => done(err))
})

describe('Route for products', () => {
  describe('Good requests for products resource', () => {
    test('POST /products response with json, status(201)', (done) => {
      request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .set('access_token', loggedInAdmin.access_token)
      .send(newProduct)
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('data')
        expect(body.data).toHaveProperty('id')
        expect(body.data).toHaveProperty('name', newProduct.name)
        expect(body.data).toHaveProperty('description', newProduct.description)
        expect(body.data).toHaveProperty('price', newProduct.price)
        expect(body.data).toHaveProperty('stock', newProduct.stock)
        expect(body.data).toHaveProperty('imageUrl', newProduct.imageUrl)
        done()
      })
      .catch(err => {
        done(err)
      })
    })

    test('GET /products | Get all products, response with json, status(200)', (done) => {
      request(app)
      .get('/products')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('data')
        expect(body.data[0]).toHaveProperty('id')
        expect(body.data[0]).toHaveProperty('name', newProduct.name)
        expect(body.data[0]).toHaveProperty('description', newProduct.description)
        expect(body.data[0]).toHaveProperty('price', newProduct.price)
        expect(body.data[0]).toHaveProperty('stock', newProduct.stock)
        expect(body.data[0]).toHaveProperty('imageUrl', newProduct.imageUrl)
        done()
      })
      .catch(err => {
        done(err)
      })
    })

    test('GET /products/{{id}} | Get single product, response with json, status(200)', (done) => {
      let id

      Product.findOne()
      .then(result => {
        id = result.id
        return request(app)
        .get('/products/' + id)
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
      })
      .catch(err => done(err))
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('data')
        expect(body.data).toHaveProperty('id', id)
        expect(body.data).toHaveProperty('name', newProduct.name)
        expect(body.data).toHaveProperty('description', newProduct.description)
        expect(body.data).toHaveProperty('price', newProduct.price)
        expect(body.data).toHaveProperty('stock', newProduct.stock)
        expect(body.data).toHaveProperty('imageUrl', newProduct.imageUrl)
        done()
      })
      .catch(err => {
        done(err)
      })
    })

    test('PUT /products/{{id}} | Modifying single product, response with json, status(200)', (done) => {
      let id
      Product.findOne()
      .then(result => {
        id = result.id
        return request(app)
        .put('/products/' + id)
        .set('Accept', 'application/json')
        .set('access_token', loggedInAdmin.access_token)
        .send(editedProduct)
        .expect('Content-type', /json/)
      })
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('data')
        expect(body.data).toHaveProperty('id', id)
        expect(body.data).toHaveProperty('name', editedProduct.name)
        expect(body.data).toHaveProperty('description', editedProduct.description)
        expect(body.data).toHaveProperty('price', editedProduct.price)
        expect(body.data).toHaveProperty('stock', editedProduct.stock)
        expect(body.data).toHaveProperty('imageUrl', editedProduct.imageUrl)
        done()
      })
      .catch(err => {
        done(err)
      })
    })
    
    test('DELETE /products/{{id}} | Delete single product, response with json, status(200)', (done) => {
      let id
      Product.findOne()
      .then(result => {
        console.log({RESULT: result})
        id = result.id
        return request(app)
        .delete('/products/' + id)
        .set('Accept', 'application/json')
        .set('access_token', loggedInAdmin.access_token)
        .expect('Content-type', /json/)
      })
      .then(response => {
        const {body, status} = response
        console.log({RESPONDNYA: body})
        expect(status).toBe(200)
        expect(body).toHaveProperty('data')
        expect(body.data).toHaveProperty('id', id)
        expect(body.data).toHaveProperty('name', editedProduct.name)
        expect(body.data).toHaveProperty('description', editedProduct.description)
        expect(body.data).toHaveProperty('price', editedProduct.price)
        expect(body.data).toHaveProperty('stock', editedProduct.stock)
        expect(body.data).toHaveProperty('imageUrl', editedProduct.imageUrl)
        expect(body.data).toHaveProperty('status', 'deleted')
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })

  describe('Bad requests for products resource', () => {
    test('POST /products regular user trying to input new product. Response with json, status(403)', (done) => {
      request(app)
      .post('/products')
      .set('Accept', 'application/json')
      .set('access_token', loggedInUser.access_token)
      .send(newProduct)
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(403)
        expect(body).toHaveProperty('status', 'fail')
        expect(body).toHaveProperty('errorCode', 'NOT_AUTHORIZED')
        done()
      })
      .catch(err => {
        done(err)
      })
    })

    test('GET /products/{{id}} | Get single product but not found, response with json, status(404)', (done) => {
      let id
      Product.create(newProduct)
      .then(result => {
        return Product.findOne({
          order: [['id', 'DESC']]
        })
      })
      .then(result => {
        id = result.id + 1
        return request(app)
        .get('/products/' + id)
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
      })
      .catch(err => done(err))
      .then(response => {
        const {body, status} = response
        expect(status).toBe(404)
        expect(body).toHaveProperty('status', 'fail')
        expect(body).toHaveProperty('errorCode', 'PRODUCT_NOT_FOUND')
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
})
// NODE_ENV=test npm test