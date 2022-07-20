import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import UserHandler from '../../adapter/handler/user_handler'
import AccountHandler from '../../adapter/handler/account_handler'
import { accountContainer, userContainer } from '../../di/inversify.config'
import { UserUseCase } from '../../domain/usecase/user_usecase'
import { TYPES } from '../../di/inversify.types'
import { AccountUseCase } from '../../domain/usecase/account_usecase'
import { swaggerSpec } from './swagger'
import logMiddleware from '../middleware/log_middleware'
import errorMessageMiddleware from '../middleware/error_message_middleware'

const router = express()
router.use(express.json())
router.use(morgan('combined'))
router.use(logMiddleware)
router.use(errorMessageMiddleware)
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cors())

const userDI = userContainer().get<UserUseCase>(TYPES.UserUseCase)
const userHandler = UserHandler(userDI)
router.use('/user', userHandler)

const accountDI = accountContainer().get<AccountUseCase>(TYPES.AccountUseCase)
const accountHandler = AccountHandler(accountDI)
router.use('/account', accountHandler)

// swagger
swaggerSpec(router)

export default router
