import React, { useState, useEffect } from "react";
import TextInput from "./Components/TextInput";
import Button from "./Components/Button";
import Server from "./Modules/Server";
import ContactsField from "./Components/ContactsField";
import AddContactError from "./Components/AddContactError";
import IContact from "./Intetfaces/IContact";
import TelInput from "./Components/TelInput";
import Search from "./Components/Search";

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

  const buttonAddHandler = () => {
    if (firstName && lastName && phoneNumber && phoneNumber.length === 18) {
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

  const buttonClearHandler = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };

  return (
    <div className="container max-w-full h-screen flex ">
      <div className="fixed m-3 p-5 border rounded bg-fraisin-black flex flex-col gap-5 shadow-2xl">
        <h3 className="font-bold text-ventian-red text-4xl">Phonebook v1</h3>
        <TextInput
          id="first name"
          labelText={"First name:"}
          placeholderText={"enter a first name..."}
          setValue={setFirstName}
          value={firstName}
        />
        <TextInput
          id="last name"
          labelText={"Last name:"}
          placeholderText={"enter a last name..."}
          setValue={setLastName}
          value={lastName}
        />
        <TelInput
          id="phone number"
          labelText={"Phone:"}
          placeholderText={"+7 (xxx) xxx xx xx"}
          setValue={setPhoneNumber}
          value={phoneNumber}
        />
        <div className="flex justify-around gap-1">
          <Button name="Add" label="Add" onClick={buttonAddHandler} />
          <Button name="Clear" label="Clear" onClick={buttonClearHandler} />
        </div>
        {contactErrVisible && (
          <AddContactError errMsg="Fields first, last name and phone cannot be empty" />
        )}
      </div>
      <div className="max-w-3xl mx-auto">
        <ContactsField
          contacts={contacts}
          setContacts={setContacts}
          server={server}
        />
      </div>
      <Search server={server} />
    </div>
  );
}

export default App;
