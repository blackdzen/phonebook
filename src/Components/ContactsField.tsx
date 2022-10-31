import React, { useState } from "react";
import IContactField from "../Intetfaces/IContactsField";
import Button from "./Button";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";

export default function ContactsField({ contacts, server, setContacts }: IContactField) {

  const [isModalDelete, setIsModalDelete] = useState(false)
  const [isModalEdit, setIsModalEdit] = useState(false)
  const [selectedContact, setSelectedContact] = useState<HTMLLIElement | null>(null)

  const buttonDeleteHandler = (event: React.MouseEvent) => {
    setIsModalDelete(true)
    const button = event.target as HTMLElement;
    const listItem = button.closest("li")
    setSelectedContact(listItem)
  };

  const clickDeleteYes = () => {
    console.log(selectedContact?.id)
    server.removeContact(selectedContact?.id);
    selectedContact?.classList.add("hidden");
    setIsModalDelete(false)
  }

  const clickDeleteNo = () => {
    setIsModalDelete(false)
  }

  const buttonEditHandler = (event: React.MouseEvent) => {
    setIsModalEdit(true)
    const button = event.target as HTMLElement;
    const listItem = button.closest("li")
    setSelectedContact(listItem)
  }

  return (
    <ul className="text-xl grid grid-cols-3 gap-5 pt-5 pl-8">
      {contacts ?
        contacts.map((contact) => (
          <li
            id={contact.id}
            key={contact.id}
            className="flex flex-col items-baseline justify-between gap-10 py-4 px-6 border-2 border-lavender-blush rounded hover:border-ventian-red transition-all cursor-pointer shadow-xl hover:shadow-2xl"
          >
            <div className="flex justify-evenly gap-3">
              <div className="first-name">{contact.firstName}</div>
              <div className="last-name">{contact.lastName}</div>{" "}
            </div>
            <div className="phone-number">{contact.phoneNumber}</div>
            <div className="flex justify-between gap-3">
              <Button
                name="Delete"
                label="Delete"
                onClick={buttonDeleteHandler}
              />
              <Button name="Edit" label="Edit" onClick={buttonEditHandler} />
            </div>
          </li>
        )) : <li className="border rounded p-8 text-xl text-ventian-red">Ooops... I can't get data from the server! =( </li>}
      {isModalDelete && <ModalDelete clickDeleteNo={clickDeleteNo} clickDeleteYes={clickDeleteYes} />}
      {isModalEdit && <ModalEdit itemList={selectedContact} setModalEdit={setIsModalEdit} setContacts={setContacts} server={server} />}
    </ul>
  );
}
