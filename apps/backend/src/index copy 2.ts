import { createServer } from 'http';
import path from 'path';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from 'backend/src/resolvers';
import router from 'backend/src/routes/auth';
import typeDefs from 'backend/src/schema';
import bodyParser from 'body-parser';
import casual from 'casual';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { GraphQLError } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import passport from 'passport';
import { WebSocketServer } from 'ws';

import { passportConfig } from './config/pasport';
import { MoviesAPI } from './data-sources';
import { upperDirectiveTransformer } from './directives';

// const getDynamicContext = async (ctx, msg, args) => {
//   // ctx is the graphql-ws Context where connectionParams live
//   if (ctx.connectionParams.authentication) {
//     const currentUser = await findUser(ctx.connectionParams.authentication);
//     return { currentUser };
//   }
//   // Otherwise let our resolvers know we don't have a current user
//   return { currentUser: null };
// };

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// const mocks = {
//   Int: () => 6,
//   Float: () => 22.1,
//   String: () => "Hello",
// };

const mocks = {
  User: () => ({
    firstName: casual.name,
    age: () => casual.integer(0, 120),
    email: casual.email,
  }),
};

const schema = addMocksToSchema({
  schema: upperDirectiveTransformer(makeExecutableSchema({ typeDefs, resolvers }), 'upper'),
  mocks,
  preserveResolvers: process.env.NODE_ENV !== 'production',
});

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
// This is the basic express session({..}) initialization.
app.use(passport.session());
app.use(passport.initialize());
// init passport on every route call.

// allow passport to use "express-session".
// require(‘./config/passport’)(passport);
app.use(() => passportConfig(passport));

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((id: string, done) => {
//   // get user from db  using id
//   done(null, id);
// });

// app.use(router);

const httpServer = createServer(app);

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer(
  {
    schema, // Adding a context property lets you add data to your GraphQL operation contextValue
    context: async (ctx, msg, args) => {
      const { cache } = server;
      const token = ctx?.connectionParams?.authentication;
      // const user = getUser(token);
      const user = token;

      // optionally block the user
      // we could also check user roles/permissions here
      if (!user) {
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return {
        // We create new instances of our data sources with each request,
        // passing in our server's cache.
        dataSources: {
          token,
          moviesAPI: new MoviesAPI({ cache }),
        },
      };
    },
    // As before, ctx is the graphql-ws Context where connectionParams live.
    // onConnect: async ctx => {
    //   // Check authentication every time a client connects.
    //   if (tokenIsNotValid(ctx.connectionParams)) {
    //     // You can return false to close the connection  or throw an explicit error
    //     throw new Error("Auth token missing!");
    //   }
    // },
    // onDisconnect(ctx, code, reason) {
    //   console.log("Disconnected!");
    // },
    // context: async (ctx, msg, args) => {
    //   // You can define your own function for setting a dynamic context
    //   // or provide a static value
    //   return getDynamicContext(ctx, msg, args);
    // },
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
  app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));
  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
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
