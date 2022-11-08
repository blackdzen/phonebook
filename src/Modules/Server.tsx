import React from "react";
import axios from "axios";
import IContact from "../Intetfaces/IContact";

export default class Server {
  serverURL: string;

  constructor(serverURL: string) {
    this.serverURL = serverURL;
  }

  async getContacts() {
    return await axios
      .get(`${this.serverURL}`)
      .then((response) => response.data);
  }

  addContact(contact: IContact) {
    return axios.post(this.serverURL, contact);
  }

  removeContact(id: string | undefined) {
    return axios.delete(`${this.serverURL}/${id}`);
  }

  editContact(id: string | undefined, contact: IContact) {
    return axios.put(`${this.serverURL}/${id}`, contact);
  }
}
