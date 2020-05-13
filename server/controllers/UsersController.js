const bcrypt = require('bcrypt')
const {OAuth2Client} = require('google-auth-library')
const {generateToken} = require('../helpers')
const {User} = require('../models')
const AppError = require('../helpers/appError')

class UsersController {
  
  static login(req, res, next) {
    const {email, password} = req.body
    
    if (!email || !password) next(new AppError('INVALID_LOGIN_DETAIL', 401))
    User.findOne({where: {email}}).then(result => {
      if (!result || !bcrypt.compareSync(password, result.password)) {
        next(new AppError('INVALID_LOGIN_DETAIL', 401))
      } else {
        const {id, firstName, lastName, email} = result
        const data = {
          id,
          email,
          firstName,
          lastName,
          access_token: generateToken(result)
        }
        res.status(200).json(data)
      }
    })
    .catch(err => next(err))
  }

  static googleLogin(req, res, next) {
    const token = req.body.id_token
    const CLIENT_ID = process.env.G_CLIENT_ID
    const client = new OAuth2Client(CLIENT_ID)
    let payload, access_token

    client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then(ticket => {
      payload = ticket.getPayload()
      return User.findOne({
        where: {email: payload.email}
      })
    })
    .then(user => {
      if (!user) {
        return User.create({
          firstName: payload.given_name,
          lastName: payload.family_name,
          email: payload.email,
          password: 'gmailcom'
        })
      } else {
        access_token = generateToken(user)
        res.status(200).json({access_token})
      }
    })
    .then(result => {
      if (result) {
        access_token = generateToken(result)
        res.status(200).json({access_token})
      }
    })
    .catch(err => next(err))
  }

  static register(req, res, next) {
    const {firstName, lastName, password, email} = req.body

    User.findOne({where: {email}}).then(result => {

      if (result) return next(new AppError('EMAIL_ALREADY_USED', 400))
      return User.create({
        firstName,
        lastName,
        password,
        email
      })
    })
    .then(result => {
      const {id, firstName, lastName, email} = result
      res.status(201).json({id, firstName, lastName, email})
    })
    .catch(err => next(err))
  }
}

module.exports = UsersController