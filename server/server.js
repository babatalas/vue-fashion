if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') require('dotenv').config()
const cors = require('cors')
const express = require('express')
const routers = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.post('/auth/login', (req, res, next) => {
//   res.status(200).json({
//     id: 1,
//     email: 'adadb@asdvga.com',
//     firstName: 'ajsndnfe',
//     lastName: 'jsnacucn',
//     access_token: 'andyebcywuecnbgvfcdxcfvgbhnjwecwbugyvftc8765rg765edcfg'
//   })
// })

app.use(routers)
app.use(errorHandler)

module.exports = app
