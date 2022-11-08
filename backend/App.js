require("dotenv").config();
const cors = require("cors");
const { json } = require("express");
const SERVER_PORT = process.env.SERVER_PORT;

const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const Contact = require("./models/contact");

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on ${SERVER_PORT} port`);
});

app.get("/contacts", (request, response) => {
  Contact.find({}).then((contacts) => response.json(contacts));
});

app.post("/contacts", (request, response) => {
  let contact = new Contact(request.body);
  contact.save().then(() => {
    response.status(200);
    return response.json({ answer: "contact added" });
  });
});

app.delete("/contacts/:id", (request, response) => {
  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204);
      return response.json({ answer: "contact deleted" });
    })
    .catch((error) => {
      console.log("Some error:" + error);
    });
});
app.put("/contacts/:id", (request, response) => {
  const body = request.body;
  console.log(body);
  console.log(request.params.id);
  const editedContact = {
    firstName: body.firstName,
    lastName: body.lastName,
    phoneNumber: body.phoneNumber,
  };
  Contact.findByIdAndUpdate(request.params.id, editedContact, { new: true })
    .then((updatedNote) => {
      response.status(200);
      response.json({ answer: "contact have been changed" });
    })
    .catch((error) => console.log(error));
});
