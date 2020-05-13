
class AppError extends Error {
  constructor(errorCode, statusCode) {
    super(errorCode)
    this.statusCode = statusCode
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.errorCode = errorCode

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError