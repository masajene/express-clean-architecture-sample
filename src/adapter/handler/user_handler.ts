import express, { Request, Response } from 'express'
import { UserUseCase } from '../../domain/usecase/user_usecase'
import { UserViewModel } from '../../domain/model/user_view_model'
import Utils from '../../tools/Utils'

export default function UserHandler(useCase: UserUseCase) {
  const router = express.Router()

  router.get('/', async (req: Request, res: Response) => {
    try {
      const users = await useCase.users()
      res.send(
        users.map(
          (u) => u.serialize()
        )
      )
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' })
    }
  })

  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id)
      const user = await useCase.userWithId(userId)
      res.send(user.serialize())
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' })
    }
  })

  router.post('/', async (req: Request, res: Response) => {
    try {
      const model = new UserViewModel(
        0,
        req.body.name,
        req.body.mainAddress,
        Utils.dateStringToDate(req.body.birthday)
      );
      const result = await useCase.createUser(model)
      res.send(result)
    } catch (err) {
      res.status(500).send({ message: 'Error fetching data' })
    }
  })
  return router
}
