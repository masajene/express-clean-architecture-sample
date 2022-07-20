import { UserViewModel } from '../model/user_view_model'

export interface UserUseCase {
  users(): Promise<UserViewModel[]>

  userWithId(id: number): Promise<UserViewModel>

  createUser(user: UserViewModel): Promise<boolean>
}
