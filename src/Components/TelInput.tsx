import React from "react";
import ITelInput from "../Intetfaces/ITelInput"
import PhoneMask from "../Modules/PhoneMask";

export default function TelInput({
  id,
  labelText,
  placeholderText,
  setValue,
  value,
}: ITelInput) {
  const phoneMask = new PhoneMask('+7')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let phoneNumber = phoneMask.getPhone(inputValue)
    setValue(phoneNumber)
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key)
    console.log(value)
  }

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
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
