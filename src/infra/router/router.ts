import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import UserHandler from '../../adapter/handler/user_handler'
import { PostgreSQLDataSource } from '../database/postgresql_datasource'
import AccountHandler from '../../adapter/handler/account_handler'
import { AccountUseCaseImpl } from '../../domain/interactor/account_usecase'
import { AccountRepositoryImpl } from '../../adapter/gateway/account_repository'
import { accountContainer, userContainer } from '../../di/inversify.config'
import { UserUseCase } from '../../domain/usecase/user_usecase'
import { TYPES } from '../../di/inversify.types'
import { AccountUseCase } from '../../domain/usecase/account_usecase'

const router = express()
router.use(express.json())
router.use(morgan('combined'))
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const userDI = userContainer().get<UserUseCase>(TYPES.UserUseCase)
const userHandler = UserHandler(userDI)
router.use('/user', userHandler)

const accountDI = accountContainer().get<AccountUseCase>(TYPES.AccountUseCase)
const accountHandler = AccountHandler(accountDI)
router.use('/account', accountHandler)

export default router
