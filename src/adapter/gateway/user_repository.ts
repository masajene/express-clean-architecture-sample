import { User } from '@prisma/client'
import { inject, injectable } from 'inversify'
import { UserRepository } from '../../domain/repository/user_repository'
import { DBProvider } from '../provider/db_provider'
import { TYPES } from '../../di/inversify.types'
import 'reflect-metadata'

@injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly db: DBProvider

  constructor(@inject(TYPES.DBProvider) db: DBProvider) {
    this.db = db
  }

  async create(user: User): Promise<User> {
    return this.db.datasource().user.create({
      data: {
        name: user.name,
        mainAddress: user.mainAddress,
        birthday: user.birthday,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  }

  async findAll(): Promise<User[]> {
    return this.db.datasource().user.findMany()
  }

  async findWithId(id: number): Promise<User> {
    return this.db.datasource().user.findUnique({ where: { id } })
  }
}
