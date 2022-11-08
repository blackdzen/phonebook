import React, { useEffect, useState } from "react";
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
  const [cursorPosition, setCursorPosition] = useState(0)

  useEffect(() => {
    const input = document.getElementById('phone number') as HTMLInputElement
    input.selectionStart = input.selectionEnd = cursorPosition
  }, [value])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const input = event.target as HTMLInputElement
    const cursorPosition = input.selectionStart
    const inputValue = input.value;
    const phoneNumber = phoneMask.getPhone(inputValue, cursorPosition)
    console.log(phoneNumber.endsWith(') '))
    if (cursorPosition === inputValue.length) {
      setCursorPosition(phoneNumber.length)
    } else {
      if (cursorPosition && phoneNumber.endsWith(') ') && phoneNumber[cursorPosition] === ')') {
        setCursorPosition(phoneNumber.length)
      } else {
        if (cursorPosition) setCursorPosition(cursorPosition)
      }
    }
    setValue(phoneNumber)
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key
    const input = event.target as HTMLInputElement
    if (key === 'Backspace' || key === 'Delete') {
      if (input.selectionStart != input.value.length) {
        event.preventDefault()
        const phoneNumber = phoneMask.deletePhone(input.selectionStart, key, input.value)
        setValue(phoneNumber)
        if (key === 'Backspace') {
          input.selectionStart ? setCursorPosition(input.selectionStart - 1) : setCursorPosition(0)
        } else {
          input.selectionStart ? setCursorPosition(input.selectionStart) : setCursorPosition(0)
        }
      }
    }
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
