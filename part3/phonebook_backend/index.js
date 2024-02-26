const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require("morgan")
const cors = require("cors")
const Contact = require("./modules/contact")

app.use(express.static('dist'))

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
morgan.token("body", (req,res)=> {
        return req.body ? JSON.stringify(req.body) : null
    
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body')) 
app.use(express.json())
app.use(cors())


app.get("/api/persons", (req, res)=>{
    Contact.find({}).then(result => res.json(result))
})

app.get("/api/persons/:id", (req,res)=> {
    const id = Number(req.params.id)
    
    Contact.findById(id)
        .then(result => res.json(result))
        .catch(err => next(err))

})

app.get("/info", (req, res) =>{
    const date = new Date()
    res.send(`
    <p>Phonebook has entries for ${Contact.length} people</p>
    <br>
    <p>${date}</p>`)
} )

app.post("/api/persons", (req, res) => {
    const number = req.body.number
    const name = req.body.name

    if (name && number){
      
            const newContact = new Contact({
                name : name,
                number: number
            })
        
            newContact.save()
            .then(result => {
                res.json(result)
            })
            .catch(err => next(err))     
        
    }
    else if (!number && !name) {
        return  res.status(400).json({error: "Please fill in the necessary fields"})
    }

    else if (!name) {
       return res.status(400).json({error: "Name is missing"})

    }
    else if (!number) {
        return res.status(400).json({error: "Number is missing"})
    }
  
   
})


app.delete("/api/persons/:id", (req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result =>{
                res.status(204).end()})
        .catch(err => next(err))

    

})

app.listen(PORT,()=> console.log(`server is listening on port ${PORT}`))

const errorHandler = (err, req, res, next) =>{
    console.log(err.message)
    if (err.name === "CastError"){
        return res.status(400).send({error: "Malformatted ID"})
    } 
    next(err)}

app.use(errorHandler)