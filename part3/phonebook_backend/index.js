/* eslint-disable no-unused-vars */
const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require("morgan")
const cors = require("cors")
const Contact = require("./modules/contact")

app.use(express.static('dist'))


morgan.token("body", (req,res) => {
        return req.body ? JSON.stringify(req.body) : null

})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(cors())


app.get("/api/persons", (req, res) => {
    Contact.find({}).then(result => res.json(result))
})

app.get("/api/persons/:id", (req,res,next) => {
    const id = req.params.id

    Contact.findById(id)
        .then(result => res.json(result))
        .catch(err => next(err))

})

app.get("/info", (req, res) => {
    const date = new Date()
    Contact.find({}).then(result => res.send(`
    <p>Phonebook has entries for ${result.length} people</p>
    <br>
    <p>${date}</p>`))

} )

app.post("/api/persons", (req, res, next) => {
    const { name, number } = req.body

    const newContact = new Contact({
        name : name,
        number: number
    })

    newContact.save()
    .then(result => {
        res.json(result)
    })
    .catch(err => next(err))


})

app.put("/api/persons/:id", (req,res,next) => {
    const { name, number } = req.body
    const contact = {
        name : name,
        number : number
    }
    Contact.findByIdAndUpdate(req.params.id, contact, {
        new: true,
        runValidators: true,
        context: "query" })
        .then(updatedContact => {
            res.json(updatedContact)
        })
        .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
                res.status(204).end()})
        .catch(err => next(err))


})

app.listen(PORT,() => console.log(`server is listening on port ${PORT}`))

const errorHandler = (err, req, res, next) => {
    console.log(err.message)
    if (err.name === "CastError"){
        return res.status(400).send({ error: "Malformatted ID" })
    } else if (err.name === "ValidationError"){
        return res.status(400).json({ error: err.message })
    }
    next(err)}

app.use(errorHandler)