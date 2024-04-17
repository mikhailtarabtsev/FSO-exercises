const {info} = require('../utils/logger')

const requestLogger = (req,res,next) =>{

    info('+++++++++++++')
    info('Request method:', req.method)
    info('Request body:', req.body)
    info('Request path:', req.path)
    info('+++++++++++++')
    next()
}

module.exports = requestLogger