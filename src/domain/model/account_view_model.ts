export class AccountViewModel {
  id: number

  email: string

  password: string

  constructor(id: number, email: string, password: string) {
    this.id = id
    this.email = email
    this.password = password
  }

  serialize() {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
