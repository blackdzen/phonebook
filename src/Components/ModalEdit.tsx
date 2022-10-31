import React, { useEffect, useState } from "react";
import IContact from "../Intetfaces/IContact";
import IModalEdit from "../Intetfaces/IModalEdit";
import Button from "./Button";
import TextInput from "./TextInput";

export default function ModalEdit({ itemList, setModalEdit, server, setContacts }: IModalEdit) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactID, setContactID] = useState("")

  useEffect(() => {
    let itemFirstName = itemList?.querySelector('.first-name')?.textContent
    itemFirstName ? setFirstName(itemFirstName) : setFirstName("")
    let itemLastName = itemList?.querySelector('.last-name')?.textContent
    itemLastName ? setLastName(itemLastName) : setLastName("")
    let itemPhoneNumber = itemList?.querySelector('.phone-number')?.textContent
    itemPhoneNumber ? setPhoneNumber(itemPhoneNumber) : setPhoneNumber("")
    let itemID = itemList?.id
    itemID ? setContactID(itemID) : setContactID("")
  }, [])

  const textInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputField = event.target;
    switch (inputField.id) {
      case "Edit first name":
        setFirstName(inputField.value.trim());
        break;
      case "Edit last name":
        setLastName(inputField.value.trim());
        break;
      case "Edit phone number":
        setPhoneNumber(inputField.value.trim());
        break;
    }
  };

  const clickEditYes = () => {
    const editedContact: IContact = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      id: contactID
    }
    server.editContact(contactID, editedContact)
      .then(() => {
        server.getContacts().then((contacts) => {
          setContacts(contacts);
        });
      })

    setModalEdit(false)
  }

  const clickEditNo = () => {
    setModalEdit(false)
  }

  return (
    <div>
      <div className="fixed inset-0 bg-black opacity-80 z-10"></div>
      <div className="fixed inset-0 flex justify-center items-center z-20 ">
        <div className="border-4 border-ventian-red rounded flex flex-col content-center gap-12 p-12 bg-black ">
          <div className="text-white text-4xl">What do you want to edit?</div>
          <div className="flex justify-evenly gap-4">
            <TextInput
              id="Edit first name"
              labelText="First name:"
              placeholderText=""
              value={firstName}
              onChange={textInputHandler}
            />
            <TextInput
              id="Edit last name"
              labelText="Second name:"
              placeholderText=""
              value={lastName}
              onChange={textInputHandler}
            />
            <TextInput
              id="Edit phone number"
              labelText="Phone number:"
              placeholderText=""
              value={phoneNumber}
              onChange={textInputHandler}
            />

          </div>
          <div className="flex gap-4 justify-center">
            <Button name="Yes" label="Yes" onClick={clickEditYes} />
            <Button name="No" label="No" onClick={clickEditNo} />
          </div>
        </div>
      </div>
    </div>
  )
}
