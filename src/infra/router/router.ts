import express from 'express'
import morgan from 'morgan'
import UserHandler from '../../adapter/handler/user_handler'
import { UserUseCaseImpl } from '../../domain/interactor/user_usecase'
import { UserRepositoryImpl } from '../../adapter/gateway/user_repository'
import { MySQLDataSource } from '../database/mysql_datasource'

const router = express()
router.use(express.json())
router.use(morgan('combined'))

const userHandler = UserHandler(
  new UserUseCaseImpl(new UserRepositoryImpl(new MySQLDataSource()))
)

router.use('/user', userHandler)
router.use('/user', userHandler)
router.use('/user', userHandler)
router.use('/user', userHandler)
router.use('/user', userHandler)

export default router
