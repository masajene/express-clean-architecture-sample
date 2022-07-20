import express, { NextFunction, Request, Response } from 'express'
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'
import { AccountViewModel } from '../../domain/model/account_view_model'
import { AccountUseCase } from '../../domain/usecase/account_usecase'
import passport from '../../infra/security/passport'

export default function AccountHandler(useCase: AccountUseCase) {
  const router = express.Router()

  passport.use(
    'signup',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const model = new AccountViewModel(0, email, password)
          await useCase.createAccount(model)

          return done(null, model)
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const account = await useCase.accountWithEmail(email)

          if (!account) {
            return done(null, false, { message: 'アカウントが見つかりません' })
          }

          const validate = account.password === password

          if (!validate) {
            return done(null, false, { message: 'パスワードが無効です' })
          }

          return done(null, account, { message: 'ログインできました' })
        } catch (error) {
          return done(error)
        }
      }
    )
  )

  // this is how you can block to only a logged user access this route.
  router.get(
    '/list',
    passport.authenticate('jwt', { session: false }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const list = await useCase.accounts()
        res.send(list.map((x) => x.serialize()))
      } catch (err) {
        next(err)
      }
    }
  )

  router.post(
    '/',
    passport.authenticate('signup', { session: false }),
    async (req: Request, res: Response) => {
      res.send(true)
    }
  )

  router.post(
    '/login',
    async (req: Request, res: Response, next: NextFunction) => {
      passport.authenticate('login', async (err, account) => {
        try {
          if (err) {
            return next(err)
          }

          if (!account) {
            return next(new Error('アカウントが見つかりません'))
          }

          const body = { id: account.id, email: account.email }
          const token = jwt.sign({ account: body }, process.env.JWT_SECRET)

          return res.json({ token })
        } catch (error) {
          return next(error)
        }
      })(req, res, next)
    }
  )

  return router
}
