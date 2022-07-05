import { UserRepository } from '../../domain/repository/user_repository'
import { User } from '../../entity/user'
import { DataSource } from 'typeorm'

export class UserRepositoryImpl implements UserRepository {
  private readonly dataSource: DataSource
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource
  }

  async create(user: User): Promise<User> {
    return this.dataSource.getRepository(User).create(user)
  }

  async findAll(): Promise<User[]> {
    return await this.dataSource.getRepository(User).find()
  }

  async findWithId(id: number): Promise<User> {
    return await this.dataSource.getRepository(User).findOneBy({ id: id })
  }
}
