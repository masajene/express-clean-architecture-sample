import { UserRepository } from '../../domain/repository/user_repository'
import { User } from '../../entity/user'
import { DataSource } from 'typeorm'
import { DBProvider } from '../provider/db_provider'

export class UserRepositoryImpl implements UserRepository {
  private readonly db: DBProvider
  constructor(db: DBProvider) {
    this.db = db
  }

  async create(user: User): Promise<User> {
    return this.db.datasource().getRepository(User).create(user)
  }

  async findAll(): Promise<User[]> {
    return await this.db.datasource().getRepository(User).find()
  }

  async findWithId(id: number): Promise<User> {
    return await this.db.datasource().getRepository(User).findOneBy({ id: id })
  }
}
