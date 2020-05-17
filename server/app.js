if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') require('dotenv').config()
const app = require('./server')
const PORT = process.env.PORT || 3000

console.log(process.env.JWT_S_KEY)
console.log(process.env.NODE_ENV)
app.listen(PORT, () => console.log('Server on PORT: ', PORT))