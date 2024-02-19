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

app.use(express.json())

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

app.post("/api/persons", (req, res) => {
    const idGenerator = () => Math.floor(Math.random() * 10000000)

    const newContact = {
        id : idGenerator(),
        name : req.body.name,
        number: Number(req.body.number)
    }

    data = data.concat(newContact)
    res.json(newContact)
})

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