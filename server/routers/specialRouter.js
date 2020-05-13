const router = require('express').Router()
const UsersController = require('../controllers/UsersController')

router.route('/login')
  .post(UsersController.login)
  
router.route('/googleLogin')
  .post(UsersController.googleLogin)
  
router.route('/register')
  .post(UsersController.register)

module.exports = router