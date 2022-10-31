import React from "react";
export default interface ITextInput {
  id: string;
  labelText: string;
  placeholderText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
