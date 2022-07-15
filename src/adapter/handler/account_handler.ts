import express, { Request, Response } from "express"
import passport from "passport"
import LocalStrategy from 'passport-local'
import jwt from "jsonwebtoken"
import {
    Strategy as JWTStrategy,
    ExtractJwt,
    StrategyOptions,
} from "passport-jwt";
import { AccountViewModel } from "../../domain/model/account_view_model"
import { AccountUseCase } from "../../domain/usecase/account_usecase"

const JTW_SECRET = "AMBITZ_SECRET"

export default function AccountHandler(useCase: AccountUseCase) {
    const router = express.Router()

    passport.use('signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const model = new AccountViewModel(
                        0,
                        email,
                        password
                    );
                    await useCase.createAccount(model)

                    return done(null, model);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use('login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email, password, done) => {
                try {
                    const account = await useCase.accountWithEmail(email);

                    if (!account) {
                        return done(null, false, { message: 'Account not found' });
                    }

                    const validate = account.password === password;

                    if (!validate) {
                        return done(null, false, { message: 'Wrong Password' });
                    }

                    return done(null, account, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        new JWTStrategy(
            {
                secretOrKey: JTW_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            async (token, done) => {
                try {
                    return done(null, token.account);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    router.get('/list', passport.authenticate('jwt', { session: false }), async (req: Request, res: Response) => {
        try {
            const list = await useCase.accounts()
            res.send(
                list.map(
                    (x) => x.serialize()
                )
            )
        } catch (err) {
            res.status(500).send({ message: 'Error fetching data' })
        }
    })

    router.post('/', passport.authenticate('signup', { session: false }), async (req: Request, res: Response) => {
        try {
            res.send(true)
        } catch (err) {
            res.status(500).send({ message: 'Error fetching data' })
        }
    })

    router.post(
        '/login',
        async (req, res, next) => {
            passport.authenticate(
                'login',
                async (err, account) => {
                    try {
                        if (err || !account) {
                            const error = new Error('An error occurred.');
                            return next(error);
                        }

                        const body = { id: account.id, email: account.email };
                        const token = jwt.sign({ account: body }, JTW_SECRET);

                        return res.json({ token });
                    } catch (error) {
                        return next(error);
                    }
                }
            )(req, res, next);
        }
    );

    return router
}