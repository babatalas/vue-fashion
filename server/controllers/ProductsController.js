
const {Product} = require('../models')
const AppError = require('../helpers/appError')

class ProductsController {

  static getMany(req, res, next) {
    Product.findAll()
    .then(result => {
      res.status(200).json({data: result})
    })
    .catch(err => next(err))
  }

  static createOne(req, res, next) {
    const {name, description, price, stock, imageUrl} = req.body
    const newProduct = {
      name,
      description,
      price,
      stock,
      imageUrl
    }
    Product.create(newProduct)
    .then(result => {
      console.log(result)
      res.status(201).json({data: result})
    })
    .catch(err => next(err))
  }
  
  static getOne(req, res, next) {
    Product.findByPk(req.params.id)
    .then(result => {
      if (!result) return next(new AppError('PRODUCT_NOT_FOUND', 404))
      res.status(200).json({data: result})
    })
    .catch(err => next(err))
  }
  
  static updateOne(req, res, next) {
    const {name, description, price, stock, imageUrl} = req.body
    const editedProducted = {
      name,
      description,
      price,
      stock,
      imageUrl
    }

    Product.findByPk(req.params.id)
    .then(result => {
      if (!result) return next(new AppError('PRODUCT_NOT_FOUND', 404))
      return Product.update(editedProducted, {
        where: {
          id: req.params.id
        }
      })
    })
    .then(result => {
      return Product.findByPk(req.params.id)
    })
    .then(result => {
      console.log(result)
      res.status(200).json({data: result})
    })
    .catch(err => next(err))
  }
  static removeOne(req, res, next) {
    let product
    Product.findByPk(req.params.id)
    .then(result => {
      if (!result) throw { name: 'PRODUCT_NOT_FOUND' }
      product = result
      product.dataValues.status = 'deleted'
      return Product.destroy({
        where: {id: req.params.id}
      })
    })
    .then(result => {
      if (result === 1) {
        res.status(200).json({data: product})
      } else {
        throw { name: 'PRODUCT_NOT_FOUND' }
      }
    })
    .catch(err => next(err))
  }
}

module.exports = ProductsController