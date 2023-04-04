/* eslint-disable no-console */
import { createServer } from 'http';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import UserModel from 'backend/src/models/user.model';
import { resolvers } from 'backend/src/resolvers';
import router from 'backend/src/routes/auth';
import typeDefs from 'backend/src/schema';
import services from 'backend/src/services';
import bodyParser from 'body-parser';
import casual from 'casual';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { buildContext } from 'graphql-passport';
import { useServer } from 'graphql-ws/lib/use/ws';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Sequelize } from 'sequelize-typescript';
import { WebSocketServer } from 'ws';

import { passportConfig } from './config/pasport';
import controllers from './controllers';
import { upperDirectiveTransformer } from './directives';
import { authDirective } from './directives/authDirective';
import { LoginData, User } from './generated/graphql';

// const getDynamicContext = async (ctx, msg, args) => {
//   // ctx is the graphql-ws Context where connectionParams live
//   if (ctx.connectionParams.authentication) {
//     const currentUser = await findUser(ctx.connectionParams.authentication);
//     return { currentUser };
//   }
//   // Otherwise let our resolvers know we don't have a current user
//   return { currentUser: null };
// };

dotenv.config();
passportConfig(passport);
const sequelize = new Sequelize('dev_db', 'postgres', '', {
  host: 'localhost',
  port: 5432,
  dialect:
    'postgres' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  models: [__dirname + '/models/**/*.model.ts'],
});

sequelize
  .authenticate()
  .then(() => console.log('db connection successful'))
  .catch(err => console.log('db connection error', err));

const mocks = {
  User: () => ({
    firstName: casual.name,
    age: () => casual.integer(0, 120),
    email: casual.email,
  }),
};

const schema = addMocksToSchema({
  // schema: authDirective(upperDirectiveTransformer(makeExecutableSchema({ typeDefs, resolvers }), 'upper'), 'auth'),
  schema: upperDirectiveTransformer(makeExecutableSchema({ typeDefs, resolvers }), 'upper'),
  mocks,
  preserveResolvers: process.env.NODE_ENV !== 'production',
});

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
app.use(cors<cors.CorsRequest>());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(morgan('dev'));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);

// This is the basic express session({..}) initialization.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async ({ id }: User, done) => {
  const user = await UserModel.findByPk(id as string);
  done(null, user);
});

app.use(router);
app.use(function (req, res, next) {
  passport.authenticate('validate-auth', { session: false }, (err: any, user: any) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res);
});
const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer(
  {
    schema,
    onConnect: async ctx => {
      // Check authentication every time a client connects.
      // if (validateAuthToken(ctx.connectionParams)) {
      //   // You can return false to close the connection  or throw an explicit error
      console.log('Schema connected!');
    },
    onDisconnect() {
      console.log('Schema disconnected!');
    },
  },
  wsServer,
);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start().then(() => {
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }: any) => {
        // console.log('req is......', req.user);
        return {
          ...buildContext({ req, res }),
          // authData: req.user as LoginData,
          dataSources: { controllers },
        };
      },
    }),
  );
  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Server is now running on http:: http://localhost:${PORT}/graphql`);
    console.log(`Server is now running on ws:: ws://localhost:${PORT}/graphql`);
  });
});

export default app;

// My problem was that I am using an Express server and applying Apollo Server as a middleware. I was not aware that I need to call graphqlServer.installSubscriptionHandlers(expressServer) too, as this was buried deep in the docs. That needs to be called on the HTTP server instance you get returned from expressApp.listen(). Now it is working!
// app.use(function (req, res, next) {
//   function afterResponse() {
//     res.removeListener("finish", afterResponse);
//     res.removeListener("close", afterResponse);

//     // action after response
//   }

//   res.on("finish", afterResponse);
//   res.on("close", afterResponse);

//   // action before request
//   // eventually calling `next()`
// });

// app.use(app.router);
