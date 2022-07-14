import { DBProvider } from '../adapter/provider/db_provider'

export const TYPES = {
  // DB
  DBProvider: Symbol.for('DBProvider'),

  // User
  UserUseCase: Symbol.for('UserUseCase'),
  UserRepository: Symbol.for('UserRepository'),
}
