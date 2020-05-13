const router = require('express').Router()
const AppError = require('../helpers/appError')
const specialRouter = require('./specialRouter')
const productsRouter = require('./productssRouter')

router.use('/', specialRouter)
router.use('/products', productsRouter)

router.all('*', (req, res, next) => {
  next(new AppError(`CANT_FIND_ENDPOINT`, 404))
})

module.exports = router