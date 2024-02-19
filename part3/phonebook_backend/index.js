const express = require("express")
const app = express()
const PORT = 3001


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

app.get("/api/persons", (req, res)=>{
    res.json(data)
})

app.get("/api/persons/:id", (req,res)=> {
    const id = Number(req.params.id)
    
    const person = data.find(contact => id === contact.id)

    if (person){
        res.json(person)
    }
    else {
        res.status(404).end()
    }
    
})

app.get("/info", (req, res) =>{
    const date = new Date()
    res.send(`
    <p>Phonebook has entries for ${data.length} people</p>
    <br>
    <p>${date}</p>`)
} )

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const person = data.find(contact => id === contact.id)
    if (person){
        data = data.filter(contact => id !== contact.id)
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }
    

})

app.listen(PORT,()=> console.log(`server is listening on port ${PORT}`))