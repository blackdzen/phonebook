export default class PhoneMask {
  isCode: boolean
  code: string
  constructor(code: string) {
    this.isCode = false
    this.code = code
  }

  getNumbers(str: string): string {
    return str.replace(/\D/g, '')
  }

  getPhone(input: string): string {
    if (input.startsWith('+')) {
      input = input.slice(this.code.length)
      this.isCode = true
    }
    console.log(this.isCode)
    let phone = input.replace(/\D/g, '')
    if (phone.length === 1) return this.code + phone + ' '
    return phone
  }
}
