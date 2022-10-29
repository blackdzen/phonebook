import React from "react";
import Server from "../Modules/Server";
import IContact from "./IContact";

export default interface IModalEdit {
  itemList: HTMLLIElement | null,
  setModalEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setContacts: React.Dispatch<React.SetStateAction<IContact[] | undefined>>
  server: Server
}
