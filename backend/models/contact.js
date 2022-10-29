const mongoose = require('mongoose')
const url = process.env.MONGODB_URL

console.log('Connecting to data base...')
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to data base.')
  })
  .catch((error) => {
    console.log(`Error connection: ${error}`)
  })

const contactShema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String
})

contactShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = new mongoose.model('Contact', contactShema)
