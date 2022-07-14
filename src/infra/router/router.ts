import express from 'express'
import morgan from 'morgan'
import UserHandler from '../../adapter/handler/user_handler'
import { UserUseCaseImpl } from '../../domain/interactor/user_usecase'
import { UserRepositoryImpl } from '../../adapter/gateway/user_repository'
import { MySQLDataSource } from '../database/mysql_datasource'
import { userContainer } from '../../di/inversify.config'
import { UserUseCase } from '../../domain/usecase/user_usecase'
import { TYPES } from '../../di/inversify.types'

const router = express()
router.use(express.json())
router.use(morgan('combined'))

const userDI = userContainer().get<UserUseCase>(TYPES.UserUseCase)
const userHandler = UserHandler(userDI)

router.use('/user', userHandler)

export default router
