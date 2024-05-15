
const tokenExtractor = (req, res, next) =>{
    
    const auth = req.get('authorization')
    if(auth && auth.startsWith('Bearer ')){
       const token = auth.replace('Bearer ', '')
       req.token = token
       next()
    }
    else{
        return null, next()
    }

    
  }

  module.exports = tokenExtractor