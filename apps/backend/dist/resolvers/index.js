"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_1 = require("backend/src/resolvers/user");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: {
        getUser: user_1.getUser,
    },
    Subscription: {
        userCreated: {
            subscribe: (0, graphql_subscriptions_1.withFilter)(() => pubsub.asyncIterator("USER_CREATED"), (payload, variables) => {
                // payload is the payload of the event that was published.
                // variables is an object containing all arguments the client provided when initiating their subscription.
                // Only push an update if the comment is on
                // the correct repository for this operation
                // return payload.commentAdded.repository_name === variables.repoFullName;
                return payload.user.email === variables.email;
            }),
        },
        // hello: {
        //   // Example using an async generator
        //   async *subscribe() {
        //     for await (const word of ["Hello", "Bonjour", "Ciao"]) {
        //       yield { hello: word };
        //     }
        //   },
        // },
        // postCreated: {
        //   // More on pubsub below
        //   subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
        // },
        // commentAdded: {
        //   subscribe: withFilter(
        //     () => pubsub.asyncIterator("COMMENT_ADDED"),
        //     (payload, variables) => {
        //       // payload is the payload of the event that was published.
        //       // variables is an object containing all arguments the client provided when initiating their subscription.
        //       // Only push an update if the comment is on
        //       // the correct repository for this operation
        //       return payload.commentAdded.repository_name === variables.repoFullName;
        //     },
        //   ),
        // },
    },
    // ...other resolvers...
};
// pubsub.publish("POST_CREATED", {
//   postCreated: {
//     author: "Ali Baba",
//     comment: "Open sesame",
//   },
// });
// createPost(parent, args, { postController }) {
//   // Datastore logic lives in postController
//   pubsub.publish("POST_CREATED", { postCreated: args });
//   return postController.createPost(args);
// },
