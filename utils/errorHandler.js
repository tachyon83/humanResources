const resHandler = require('./responseHandler')

module.exports = err => {
    console.log(err)
    return resHandler(null)
}