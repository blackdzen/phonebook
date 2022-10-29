require('dotenv').config()
const cors = require('cors')
const { json } = require('express')
const PORT = process.env.PORT

const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const Contact = require('./models/contact')

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})

app.get('/contacts', (request, response) => {
  Contact.find({}).then((contacts) => response.json(contacts))
})

app.post('/contacts', (request, response) => {
  let contact = new Contact(request.body)
  contact.save()
  response.sendStatus(201).end()
  return response.json()
})

app.delete('/contacts/:id', (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then((response) => {
      response.sendStatus(204).send()
    })
    .catch(() => {
      console.log('Some error')
    })
  return response.json()
})
app.put('/contacts/:id', (request, response) => {
  const body = request.body
  console.log(body)
  console.log(request.params.id)
  const editedContact = {
    firstName: body.firstName,
    lastName: body.lastName,
    phoneNumber: body.phoneNumber
  }
  Contact.findByIdAndUpdate(request.params.id, editedContact, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => console.log(error))
  return response.json()
})
