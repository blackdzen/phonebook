import React, { useEffect, useState } from "react";
import ISearch from "../Intetfaces/ISearch";
import TelInput from "./TelInput";
import TextInput from "./TextInput";
import IContact from "../Intetfaces/IContact";
import Button from "./Button";

type Filter = {
  filterName: string,
  filterValue: string
}

export default function Search({ server }: ISearch) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<IContact[] | undefined>();
  const [filteredContacts, setFilteredContacts] = useState<IContact[] | undefined>();
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const [isContactTableOpen, setIsContactTableOpen] = useState(false)

  useEffect(() => {
    if (isSearchWindowOpen) {
      server.getContacts().then((contacts) => {
        setContacts(contacts);
      });
    }
  }, [isSearchWindowOpen]);

  useEffect(() => {
    let filters: Filter[] = []
    const filterPanel = document.querySelector('.filter-panel')

    if (filterPanel) {
      const inputs = filterPanel.querySelectorAll('input')
      for (const index in inputs) {
        if (inputs.hasOwnProperty(index)) {
          if (inputs[index].value.length > 0) filters.push({ filterName: inputs[index].id, filterValue: inputs[index].value })
        }
      }
    }

    setFilteredContacts(filterContacts(filters))
  }, [firstName, lastName, phoneNumber]);

  const filterContacts = (filters: Filter[]): IContact[] => {
    let result: IContact[] = [];
    if (contacts) {
      if (filters.length === 0) {
        setIsContactTableOpen(false)
      } else if (filters.length === 1) {
        setIsContactTableOpen(true)
        result = contacts.filter(contact => {
          return Object.values(contact)[Object.keys(contact).indexOf(filters[0].filterName)].startsWith(filters[0].filterValue)
        })
      } else {
        setIsContactTableOpen(true)
        result = contacts
        for (const filter of filters) {
          result = result.filter(contact => {
            return Object.values(contact)[Object.keys(contact).indexOf(filter.filterName)].startsWith(filter.filterValue)
          })
        }
      }
    }
    return result;
  };

  const onClick = () => {
    setIsSearchWindowOpen(true);
  };

  const clickClear = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
  };
  const clickBack = () => {
    setIsSearchWindowOpen(false);
  };

  const clickBackground = () => {
    setIsSearchWindowOpen(false);
  };

  return (
    <div>
      <div
        className="w-16 h-16 p-2 fixed top-4 right-4 border-2 border-lavender-blush rounded-full hover:border-ventian-red transition-all cursor-pointer shadow-xl hover:shadow-3xl "
        onClick={onClick}
      >
        <img
          src="./search-icon.svg"
          className="w-full h-full"
          alt="Search button icon"
        ></img>
      </div>
      {isSearchWindowOpen && (
        <div className="fixed top-0 left-0 w-full h-full">
          <div
            className="fixed top-0 left-0 w-full h-full bg-black opacity-80"
            onClick={clickBackground}
          ></div>
          <div className="h-3/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border rounded border-ventian-red bg-black flex flex-col gap-5 px-5 overflow-scroll">
            <div className="text-4xl text-white text-center pt-5">
              Who we are looking for?
            </div>
            <div className="filter-panel flex justify-evenly gap-5 mt-5">
              <TextInput
                id="firstName"
                labelText={"First name:"}
                placeholderText={"enter a first name..."}
                setValue={setFirstName}
                value={firstName}
              />
              <TextInput
                id="lastName"
                labelText={"Last name:"}
                placeholderText={"enter a last name..."}
                setValue={setLastName}
                value={lastName}
              />
              <TelInput
                id="phoneNumber"
                labelText={"Phone:"}
                placeholderText={"+7 (xxx) xxx xx xx"}
                setValue={setPhoneNumber}
                value={phoneNumber}
              />
            </div>
            <div className="flex justify-center gap-5 mt-5 mb-5">
              <Button name="Clear" label="Clear" onClick={clickClear} />
              <Button name="Back" label="Back" onClick={clickBack} />
            </div>
            {isContactTableOpen && <table className="table-fixed text-white border-separate border-spacing-2">
              <thead>
                <tr className="text-2xl">
                  <th>First name</th>
                  <th>Second name</th>
                  <th>Phone number</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts ? (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="text-2xl text-center cursor-pointer  transition-all"
                    >
                      <td className="border border-lavender-blush hover:border-ventian-red">{contact.firstName}</td>
                      <td className="border border-lavender-blush hover:border-ventian-red">{contact.lastName}</td>
                      <td className="border border-lavender-blush hover:border-ventian-red">{contact.phoneNumber}</td>
                    </tr>
                  ))) : (
                  <div>No contacts...</div>
                )}
              </tbody>
            </table>
            }
          </div>
        </div>
      )}
    </div>
  );
}
