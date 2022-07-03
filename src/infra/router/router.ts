import express from 'express'
import UserHandler from '../../adapter/handler/user_handler'
import { UserUseCaseImpl } from '../../domain/interactor/user_usecase'
import { UserRepositoryImpl } from '../../adapter/gateway/user_repository'
import { MySQLDataSource } from '../database/mysql_datasource'
const router = express()
router.use(express.json())

const userHandler = UserHandler(new UserUseCaseImpl(new UserRepositoryImpl(MySQLDataSource)))

router.use('/user', userHandler)

export default router
