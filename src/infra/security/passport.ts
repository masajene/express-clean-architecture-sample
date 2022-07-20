import 'dotenv/config'
import passport from 'passport'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.account)
      } catch (error) {
        return done(error)
      }
    }
  )
)
export default passport
