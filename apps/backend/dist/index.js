"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const mock_1 = require("@graphql-tools/mock");
const schema_1 = require("@graphql-tools/schema");
const resolvers_1 = require("backend/src/resolvers");
const schema_2 = __importDefault(require("backend/src/schema"));
const body_parser_1 = __importDefault(require("body-parser"));
const casual_1 = __importDefault(require("casual"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const graphql_1 = require("graphql");
const ws_1 = require("graphql-ws/lib/use/ws");
const ws_2 = require("ws");
const data_sources_1 = require("./data-sources");
const directives_1 = require("./directives");
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
        firstName: casual_1.default.name,
        age: () => casual_1.default.integer(0, 120),
        email: casual_1.default.email,
    }),
};
const schema = (0, mock_1.addMocksToSchema)({
    schema: (0, directives_1.upperDirectiveTransformer)((0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.default, resolvers: resolvers_1.resolvers }), "upper"),
    mocks,
    preserveResolvers: process.env.NODE_ENV !== "production",
});
// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new ws_2.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = (0, ws_1.useServer)({
    schema,
    context: (ctx, msg, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const { cache } = server;
        const token = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.connectionParams) === null || _a === void 0 ? void 0 : _a.authentication;
        // const user = getUser(token);
        const user = token;
        // optionally block the user
        // we could also check user roles/permissions here
        if (!user) {
            // throwing a `GraphQLError` here allows us to specify an HTTP status code,
            // standard `Error`s will have a 500 status code by default
            throw new graphql_1.GraphQLError("User is not authenticated", {
                extensions: {
                    code: "UNAUTHENTICATED",
                    http: { status: 401 },
                },
            });
        }
        return {
            // We create new instances of our data sources with each request,
            // passing in our server's cache.
            dataSources: {
                token,
                moviesAPI: new data_sources_1.MoviesAPI({ cache }),
            },
        };
    }),
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
}, wsServer);
// Set up ApolloServer.
const server = new server_1.ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        // Proper shutdown for the WebSocket server.
        {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                                yield serverCleanup.dispose();
                            });
                        },
                    };
                });
            },
        },
    ],
});
server.start().then(() => {
    app.use("/graphql", (0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server));
    const PORT = 4000;
    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
        console.log(`Server is now running on http://localhost:${PORT}/graphql`);
    });
});
exports.default = app;
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
