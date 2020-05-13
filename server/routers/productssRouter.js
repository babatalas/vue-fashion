const router = require('express').Router()
const Controller = require('../controllers/ProductsController')
const {authentication, authorization} = require('../middlewares/authUser')

router.route('/')
.get(Controller.getMany)
.post(authentication, authorization, Controller.createOne)

router.route('/:id')
  .get(Controller.getOne)
  .put(authentication, authorization, Controller.updateOne)
  .delete(authentication, authorization, Controller.removeOne)

module.exports = router