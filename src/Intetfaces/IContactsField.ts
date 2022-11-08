import React, { SetStateAction } from "react";
import Server from "../Modules/Server";
import IContact from "./IContact";

export default interface IContactField {
  contacts: IContact[] | undefined;
  setContacts: React.Dispatch<SetStateAction<IContact[] | undefined>>;
  server: Server;
}
