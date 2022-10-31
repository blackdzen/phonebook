import React, { SetStateAction } from "react";
export default interface ITextInput {
  id: string;
  labelText: string;
  placeholderText: string;
  setValue: React.Dispatch<SetStateAction<string>>
  value: string
}
