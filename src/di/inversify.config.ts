import { Container } from 'inversify'
import { DBProvider } from '../adapter/provider/db_provider'
import { UserRepository } from '../domain/repository/user_repository'
import { TYPES } from './inversify.types'
import { UserRepositoryImpl } from '../adapter/gateway/user_repository'
import { UserUseCase } from '../domain/usecase/user_usecase'
import { UserUseCaseImpl } from '../domain/interactor/user_usecase'
import { PostgreSQLDataSource } from '../infra/database/postgresql_datasource'
import { AccountRepository } from '../domain/repository/account_repository'
import { AccountUseCase } from '../domain/usecase/account_usecase'
import { AccountRepositoryImpl } from '../adapter/gateway/account_repository'
import { AccountUseCaseImpl } from '../domain/interactor/account_usecase'

export const userContainer = (): Container => {
  const container = new Container()

  // DB
  container.bind<DBProvider>(TYPES.DBProvider).to(PostgreSQLDataSource)

  // User
  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl)
  container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCaseImpl)
  return container
}

export const accountContainer = (): Container => {
  const container = new Container()

  // DB
  container.bind<DBProvider>(TYPES.DBProvider).to(PostgreSQLDataSource)

  // Account
  container
    .bind<AccountRepository>(TYPES.AccountRepository)
    .to(AccountRepositoryImpl)
  container.bind<AccountUseCase>(TYPES.AccountUseCase).to(AccountUseCaseImpl)
  return container
}
