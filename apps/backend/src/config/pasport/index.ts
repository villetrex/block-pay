import dayjs from '@villetrex/dayjs';
import UserModel from 'backend/src/models/user.model';
import dotenv from 'dotenv';
import { GraphQLLocalStrategy } from 'graphql-passport';
import jwt from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import passportJwt from 'passport-jwt';
import passPortLocal from 'passport-local';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const LocalStrategy = passPortLocal.Strategy;
// passport-jwt

const REFRESH_TOKEN_TLL = dayjs()
  .add(parseInt(process.env.REFRESH_TOKEN_TLL as string) ?? 30, 'hours')
  .toISOString();
const ACCESS_TOKEN_TLL = dayjs()
  .add(parseInt(process.env.ACCESS_TOKEN_TLL as string) ?? 24, 'hours')
  .toISOString();

const JWT_SECRET = (process.env.JWT_SECRET ?? 'secret').toString();

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
// opts.secretOrKey = config.secret;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
  // issuer: process.env.JWT_ISSUER ?? 'villetrex@gmail.com',
  // audience: 'trenedex.com',
};

const processLogin = async (email: any, password: any, done: any) =>
  await UserModel.findOne({ where: { email } })
    .then(async user => {
      console.log('processing login................................................................');
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }
      const isPasswordValid = user.validatePassword(password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect email or password.' });
      }

      const refereshId = uuidv4();
      await UserModel.update({ refreshToken: refereshId }, { where: { email } });
      const refreshToken = jwt.sign({ refereshId, ttl: REFRESH_TOKEN_TLL }, JWT_SECRET);
      const accessToken = jwt.sign(
        {
          id: user.id,
          ttl: ACCESS_TOKEN_TLL,
        },
        JWT_SECRET as string,
      );
      const data = {
        user,
        authTokens: {
          accessToken,
          refreshToken,
          accessTokenExpiry: ACCESS_TOKEN_TLL,
        },
      };

      return done(null, data, { message: 'Logged In Successfully' });
    })
    .catch(err => done(err));

export const passportConfig = (passport: PassportStatic) => {
  try {
    passport.use(
      'validate-auth',
      new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        return UserModel.findOne({ where: { id: jwt_payload.id } })
          .then((user: UserModel | null) => {
            if (dayjs().isAfter(jwt_payload.ttl)) {
              return done('token expired', false);
            }
            if (user) {
              return done(null, user.toJSON());
            }
            return done(null, false);
          })
          .catch((err: Error) => done(err, false));
      }),
    );

    passport.use(
      'graphql-login',
      new GraphQLLocalStrategy(
        async (email: any, password: any, done: any) => await processLogin(email, password, done),
      ),
    );

    passport.use(
      'login',
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async (email: string, password: string, done: any) => processLogin(email, password, done),
      ),
    );
  } catch (err) {
    console.log(err);
  }
};
