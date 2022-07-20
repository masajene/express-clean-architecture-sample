import Utils from '../../tools/Utils'

export class UserViewModel {
  id: number

  name: string

  mainAddress: string

  birthday: Date

  constructor(id: number, name: string, mainAddress: string, birthday: Date) {
    this.id = id
    this.name = name
    this.mainAddress = mainAddress
    this.birthday = birthday
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      mainAddress: this.mainAddress,
      birthday: Utils.dateToDateString(this.birthday),
    }
  }
}
