const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = async (req, res, next)=>{

    if(req.token){
     
      const decodedToken =  jwt.verify(req.token, process.env.SECRET)
      const id = decodedToken.id
      const user = await User.findById(id)
      req.user = user      
      next()
    }
    else{
      next()
    }
}

module.exports = userExtractor