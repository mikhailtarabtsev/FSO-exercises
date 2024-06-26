const {info, error} = require('../utils/logger')

const unknownEndpoint = (req, res, next) =>{
    res.status(404).json({error: 'unknown endpoint'})
    next()
}

const errorHandler = (err,req,res,next) =>{

if(err.name === 'MongoServerError' && err.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({error: 'Expected "username" to be unique'})
}

if(err.name === 'CastError') {
    return res.status(400).json({error: err.message})
}
else if(err.name === 'ValidationError') {
    return res.status(400).json({error: err.message})
    }
else if (err.name === 'JsonWebTokenError'){
    return res.status(401).json({error: "token is incorrect" })
}
else{
    error(err)
    }

next(err)
}

module.exports = {
    errorHandler,
    unknownEndpoint
}