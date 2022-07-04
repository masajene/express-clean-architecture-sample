import { UserUseCase } from '../../application/usecase/user_usecase'
import express from 'express'
import { Request, Response } from 'express'
import { User } from '../../domain/entity/user'

export default function UserHandler(useCase: UserUseCase) {
  const router = express.Router()

  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await useCase.users()
      res.send(users)
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Error fetching data' })
    }
  })

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.id as string)
      const users = await useCase.userWithId(userId)
      res.send(users)
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Error fetching data' })
    }
  })

  router.post('/', async (req: Request, res: Response) => {
    try {
      const users = await useCase.createUser({} as User)
      res.send(users)
    } catch (err) {
      console.error(err)
      res.status(500).send({ message: 'Error fetching data' })
    }
  })
  return router
}
