const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helpers = {

  hashPassword: async (password) => {
    const saltRounds = 2
    const hash = await bcrypt.hashSync(password, saltRounds)
    return hash
  },
  generateToken: (user) => {
    return jwt.sign({ 
      id: user.id, 
      email: user.email 
    }, process.env.JWT_S_KEY)
  },
  verifyToken: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_S_KEY, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    })
  }
}

module.exports = helpers