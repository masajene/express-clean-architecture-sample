import Utils from "../../tools/Utils"

export class UserViewModel {
  private _id: number

  private _name: string

  private _mainAddress: string

  private _birthday: Date

  constructor(id: number, name: string, mainAddress: string, birthday: Date) {
    this._id = id
    this._name = name
    this._mainAddress = mainAddress
    this._birthday = birthday
  }

  get id(): number {
    return this._id
  }

  set id(value: number) {
    this._id = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }

  get mainAddress(): string {
    return this._mainAddress
  }

  set mainAddress(value: string) {
    this._mainAddress = value
  }

  get birthday(): Date {
    return this._birthday
  }

  set birthday(value: Date) {
    this._birthday = value
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      mainAddress: this.mainAddress,
      birthday: Utils.dateToDateString(this.birthday)
    }
  }
}
