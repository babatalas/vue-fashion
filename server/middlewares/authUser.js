const {User, Cart} = require('../models')
const {verifyToken} = require('../helpers')
const AppError = require('../helpers/appError')

const authUser = {

  authentication: async (req, res, next) => {
    let {access_token} = req.headers
    let errorCode = 'NOT_AUTHENTICATED'
    console.log(req.headers.access_token)
    if (!access_token) return next(new AppError(errorCode, 401))
    
    try {
      const payload = await verifyToken(access_token)
      const user = await User.findByPk(payload.id)

      if (!user) return next(new AppError(errorCode, 401))
      req.user = user
      next()
    } catch(err) {
      next(err)
    }
  },

  authorization: (req, res, next) => {
    if (req.user.RoleId !== 1) return next(new AppError(`NOT_AUTHORIZED`, 403))
    next()
  },
  
  cartAuthorization: (req, res, next) => {
    if (req.user.id === req.body.UserId) return next(new AppError(`NOT_AUTHORIZED`, 403))
    next()
  },
}

module.exports = authUser