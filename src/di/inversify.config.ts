import { Container } from 'inversify'
import { DBProvider } from '../adapter/provider/db_provider'
import { UserRepository } from '../domain/repository/user_repository'
import { MySQLDataSource } from '../infra/database/mysql_datasource'
import { TYPES } from './inversify.types'
import { UserRepositoryImpl } from '../adapter/gateway/user_repository'
import { UserUseCase } from '../domain/usecase/user_usecase'
import { UserUseCaseImpl } from '../domain/interactor/user_usecase'

export const userContainer = (): Container => {
  const container = new Container()

  // DB
  container.bind<DBProvider>(TYPES.DBProvider).to(MySQLDataSource)

  // User
  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
  container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCaseImpl)
  return container
}
