import React, { useState, useEffect } from "react";
import TextInput from "./Components/TextInput";
import Button from "./Components/Button";
import Server from "./Modules/Server";
import ContactsField from "./Components/ContactsField";
import AddContactError from "./Components/AddContactError";
import IContact from "./Intetfaces/IContact";

function App() {
  const server = new Server("http://localhost:3005/contacts");

  useEffect(() => {
    server.getContacts().then((contacts) => {
      setContacts(contacts);
    });
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<IContact[] | undefined>();
  const [contactErrVisible, setContactErrVisible] = useState(false);

  const textInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputField = event.target;
    switch (inputField.id) {
      case "first name":
        setFirstName(inputField.value.trim());
        break;
      case "last name":
        setLastName(inputField.value.trim());
        break;
      case "phone number":
        setPhoneNumber(inputField.value.trim());
        break;
    }
  };

  const buttonAddHandler = () => {
    if (firstName && lastName && phoneNumber) {
      server.addContact({ firstName, lastName, phoneNumber }).then(() => {
        server.getContacts().then((contacts) => {
          setContacts(contacts);
        });
      });
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setContactErrVisible(false);
    } else {
      setContactErrVisible(true);
    }
  };

  return (
    <div className="container max-w-full h-screen flex ">
      <div className="fixed m-3 p-5 border rounded bg-fraisin-black flex flex-col gap-5 shadow-2xl">
        <h3 className="font-bold text-ventian-red text-4xl">Phonebook v1</h3>
        <TextInput
          id="first name"
          labelText={"First name:"}
          placeholderText={"enter a first name..."}
          value={firstName}
          onChange={textInputHandler}
        />
        <TextInput
          id="last name"
          labelText={"Last name:"}
          placeholderText={"enter a last name..."}
          value={lastName}
          onChange={textInputHandler}
        />
        <TextInput
          id="phone number"
          labelText={"Phone:"}
          placeholderText={"enter a phone number..."}
          value={phoneNumber}
          onChange={textInputHandler}
        />
        <div className="flex justify-around gap-1">
          <Button name="Add" label="Add" onClick={buttonAddHandler} />
          <Button name="Search" label="Search" onClick={() => { }} />
        </div>
        {contactErrVisible && < AddContactError errMsg="Fields first, last name and phone cannot be empty" />}
      </div>
      <div className="max-w-3xl mx-auto">
        <ContactsField contacts={contacts} setContacts={setContacts} server={server} />
      </div>
    </div >
  );
}

export default App;
