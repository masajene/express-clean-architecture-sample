import { User } from '../../domain/entity/user'

export interface UserRepository {
  findAll(): Promise<User[]>
  findWithId(id: number): Promise<User>
  create(user: User): Promise<User>
}
