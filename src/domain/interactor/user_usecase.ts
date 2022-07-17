import { inject, injectable } from 'inversify'
import { UserUseCase } from '../usecase/user_usecase'
import { UserRepository } from '../repository/user_repository'
import { UserViewModel } from '../model/user_view_model'
import { TYPES } from '../../di/inversify.types'
import 'reflect-metadata'

@injectable()
export class UserUseCaseImpl implements UserUseCase {
  private repository: UserRepository

  constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
    this.repository = repository
  }

  async users(): Promise<UserViewModel[]> {
    console.log('users')
    const entity = await this.repository.findAll()
    return entity.map(
      (v) => new UserViewModel(v.id, v.name, v.mainAddress, v.birthday)
    )
  }

  async createUser(user: UserViewModel): Promise<boolean> {
    const res = await this.repository.create({
      id: user.id,
      name: user.name,
      mainAddress: user.mainAddress,
      birthday: user.birthday,
      createdAt: new Date(),
      updatedAt: null,
    })
    return res != null
  }

  async userWithId(id: number): Promise<UserViewModel> {
    const entity = await this.repository.findWithId(id)
    return new UserViewModel(
      entity.id,
      entity.name,
      entity.mainAddress,
      entity.birthday
    )
  }
}
