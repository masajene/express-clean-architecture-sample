import { inject, injectable } from 'inversify'
import { UserRepository } from '../../domain/repository/user_repository'
import { User } from '../../entity/user'
import { DBProvider } from '../provider/db_provider'
import { TYPES } from '../../di/inversify.types'

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly db: DBProvider

  constructor(@inject(TYPES.DBProvider) db: DBProvider) {
    this.db = db
  }

  async create(user: User): Promise<User> {
    return this.db.datasource().getRepository(User).create(user)
  }

  async findAll(): Promise<User[]> {
    return this.db.datasource().getRepository(User).find()
  }

  async findWithId(id: number): Promise<User> {
    return this.db.datasource().getRepository(User).findOneBy({ id })
  }
}
