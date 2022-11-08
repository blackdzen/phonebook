// Phone mask: <country code> (<city code>) <first part> <second part> <third part>
// Example +7 (921) 123 45 67 where:
// +7 --> country code, whiche can have any number of character and initialized when creating a class
// (921) --> city or mobile operator code
// 123 --> first part of a phone number
// 45 --> second part of the phone number
// 67 --> third part of the phone number

export default class PhoneMask {
  isCountryCode: boolean;
  countryCode: string;
  cityCode: string;
  firstPart: string;
  secondPart: string;
  thirdPart: string;

  constructor(code: string) {
    this.isCountryCode = false;
    this.countryCode = code;
    this.cityCode = "";
    this.firstPart = "";
    this.secondPart = "";
    this.thirdPart = "";
  }

  checkInput(input: string): string {
    if (input === "+") return "+";
    let formattedInput = "";
    if (
      input.startsWith(this.countryCode) &&
      input.length === 10 + this.countryCode.length
    ) {
      input = input.slice(this.countryCode.length);
    }
    if (input.startsWith(this.countryCode)) {
      input = input.slice(this.countryCode.length + 1);
    }
    if (input.length === 5 && input[4] === ")") {
      input = input.slice(0, 3);
    }
    formattedInput = input.replace(/\D/g, "");
    if (
      formattedInput.length === 11 &&
      (formattedInput.startsWith("8") || formattedInput.startsWith("7"))
    )
      formattedInput = formattedInput.substring(1);
    return formattedInput;
  }

  slicePhoneNumber(phoneNumber: string) {
    if (phoneNumber.length === 3) {
      this.cityCode = `(${phoneNumber})`;
    } else if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
      this.cityCode = `(${phoneNumber.slice(0, 3)})`;
      this.firstPart = phoneNumber.slice(3, 6);
    } else if (phoneNumber.length > 6 && phoneNumber.length <= 8) {
      this.cityCode = `(${phoneNumber.slice(0, 3)})`;
      this.firstPart = phoneNumber.slice(3, 6);
      this.secondPart = phoneNumber.slice(6, 8);
    } else if (phoneNumber.length > 8) {
      this.cityCode = `(${phoneNumber.slice(0, 3)})`;
      this.firstPart = phoneNumber.slice(3, 6);
      this.secondPart = phoneNumber.slice(6, 8);
      this.thirdPart = phoneNumber.slice(8, 10);
    }
  }

  constructPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length === 0) return "";
    if (phoneNumber === "+") return `${this.countryCode} (`;
    if (phoneNumber.length >= 1 && phoneNumber.length < 3) {
      phoneNumber = `(${phoneNumber}`;
    } else if (phoneNumber.length === 3) {
      phoneNumber = `${this.cityCode} `;
    } else if (phoneNumber.length > 3 && phoneNumber.length < 6) {
      phoneNumber = `${this.cityCode} ${phoneNumber.slice(3)}`;
    } else if (phoneNumber.length === 6) {
      phoneNumber = `${this.cityCode} ${this.firstPart}`;
    } else if (phoneNumber.length === 7) {
      phoneNumber = `${this.cityCode} ${this.firstPart} ${phoneNumber.slice(
        6
      )}`;
    } else if (phoneNumber.length === 8) {
      phoneNumber = `${this.cityCode} ${this.firstPart} ${this.secondPart}`;
    } else if (phoneNumber.length === 9) {
      phoneNumber = `${this.cityCode} ${this.firstPart} ${
        this.secondPart
      } ${phoneNumber.slice(8)}`;
    } else if (phoneNumber.length >= 10) {
      phoneNumber = `${this.cityCode} ${this.firstPart} ${this.secondPart} ${this.thirdPart}`;
    }
    return `${this.countryCode} ${phoneNumber}`;
  }

  getPhone(input: string, cursorPosition: number | null): string {
    let phoneNumber = this.checkInput(input);
    this.slicePhoneNumber(phoneNumber);
    phoneNumber = this.constructPhoneNumber(phoneNumber);
    if (phoneNumber) {
      return phoneNumber;
    } else {
      return "";
    }
  }

  deletePhone(
    cursorPosition: number | null,
    key: string,
    inputValue: string
  ): string {
    let phoneNumber = inputValue;
    if (!cursorPosition) cursorPosition = 0;

    let isCodePart: boolean | null = null;
    cursorPosition <= this.countryCode.length
      ? (isCodePart = true)
      : (isCodePart = false);

    const indelibleCharacters = ["(", ")", " "];

    const rightFromCursor = cursorPosition;
    const leftFromCursor = cursorPosition - 1;

    if (!isCodePart) {
      if (
        key === "Backspace" &&
        indelibleCharacters.indexOf(inputValue[leftFromCursor]) < 0
      ) {
        phoneNumber =
          inputValue.substring(0, leftFromCursor) +
          inputValue.substring(rightFromCursor);
      }
      if (
        key === "Delete" &&
        indelibleCharacters.indexOf(inputValue[rightFromCursor]) < 0
      ) {
        phoneNumber =
          inputValue.substring(0, rightFromCursor) +
          inputValue.substring(rightFromCursor + 1);
      }
    }
    return phoneNumber;
  }
}
