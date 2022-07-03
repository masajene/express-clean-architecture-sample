import { UserUseCase } from '../../application/usecase/user_usecase'
import { User } from '../entity/user'
import { UserRepository } from '../../application/repository/user_repository'

export class UserUseCaseImpl implements UserUseCase {
  private repository: UserRepository
  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async users(): Promise<User[]> {
    return await this.repository.findAll()
  }

  async createUser(user: User): Promise<boolean> {
    const res = await this.repository.create(user)
    return res != null
  }

  async userWithId(id: number): Promise<User> {
    return await this.repository.findWithId(id)
  }
}
