const AppError = require('../helpers/appError')

const handleValidationErrorDB = (error) => {
  const err =  new AppError('VALIDATION_ERROR', 400)
  err.message = error.errors.map(el => el.message += '.')
  return err
}

const handleSequelizeDatabaseError = (error) => {
  let err

  if (error.parent.code === '22P02') {
    err = new AppError('INVALID_TEXT_REPRESENTATION', 400)
    err.message = 'Invalid input syntax for type integer.'
  }
  return err
}

const handleValidationErrorToken = (error) => {
  const errorCode = 'NOT_AUTHENTICATED'
  return new AppError(errorCode, 401)
}

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode,
    stack: err.stack,
    error: err
  })
}

const sendErrProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode,
    message: err.message
  })
}

module.exports = (err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  err.message = err.message || 'Something bad happend. It is not our fault. Or maybe it is.'
  err.errorCode = err.errorCode || 'UNKNOWN_ERROR'

  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    let error = {...err}

    if (error.name === 'SequelizeValidationError') error = handleValidationErrorDB(error)
    if (error.name === 'SequelizeDatabaseError') error = handleSequelizeDatabaseError(error)
    if (error.name === 'JsonWebTokenError') error = handleValidationErrorToken(error)

    sendErrProd(error, res)
  } else {
    sendErrDev(err, res)
  }
}