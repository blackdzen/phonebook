import React from "react";
import ITextInput from "../Intetfaces/ITextInput";

export default function TextInput({
  id,
  labelText,
  placeholderText,
  setValue,
  value,
}: ITextInput) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const inputValue = input.value;
    const valueChecker = new RegExp("^.*[^A-zА-яЁё].*$");
    !valueChecker.test(inputValue)
      ? setValue(inputValue.trim())
      : console.log(value);
  };
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-medium text-white text-2xl">{labelText}</h4>
      <input
        id={id}
        className=" focus:border-2 focus:border-ventian-red focus:outline-none focus:box-content border-2 rounded pl-4 py-3 text-base focus:shadow-inner"
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
