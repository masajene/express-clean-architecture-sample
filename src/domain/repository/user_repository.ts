import { User } from '@prisma/client'

export interface UserRepository {
  findAll(): Promise<User[]>
  findWithId(id: number): Promise<User>
  create(user: User): Promise<User>
}
