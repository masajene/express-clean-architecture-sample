import express from 'express'
import UserHandler from '../../adapter/handler/user_handler'
import { UserUseCaseImpl } from '../../domain/interactor/user_usecase'
import { UserRepositoryImpl } from '../../adapter/gateway/user_repository'
import { PostgreSQLDataSource } from '../database/postgresql_datasource'
import AccountHandler from '../../adapter/handler/account_handler'
import { AccountUseCaseImpl } from '../../domain/interactor/account_usecase'
import { AccountRepositoryImpl } from '../../adapter/gateway/account_repository'

const router = express()
router.use(express.json())

const datasource = new PostgreSQLDataSource()

const userHandler = UserHandler(
  new UserUseCaseImpl(new UserRepositoryImpl(datasource))
)
router.use('/user', userHandler)

const accountHandler = AccountHandler(
  new AccountUseCaseImpl(new AccountRepositoryImpl(datasource))
)
router.use('/account', accountHandler)

export default router
