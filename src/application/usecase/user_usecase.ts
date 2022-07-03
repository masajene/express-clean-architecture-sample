import { User } from '../../domain/entity/user'

export interface UserUseCase {
  users(): Promise<User[]>
  userWithId(id: number): Promise<User>
  createUser(user: User): Promise<boolean>
}
