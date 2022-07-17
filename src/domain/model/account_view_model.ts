export class AccountViewModel {
  private _id: number

  private _email: string

  private _password: string

  constructor(id: number, email: string, password: string) {
    this._id = id
    this._email = email
    this._password = password
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get email(): string {
    return this._email
  }

  set email(value: string) {
    this._email = value
  }

  get password(): string {
    return this._password
  }

  set password(value: string) {
    this._password = value
  }

  serialize() {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
