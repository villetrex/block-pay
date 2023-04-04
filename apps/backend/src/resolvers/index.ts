import { getTransactions } from 'backend/src/resolvers/transactions';
import { createUser, getUsers, login } from 'backend/src/resolvers/users';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    getUsers,
    getTransactions,
  },
  Mutation: {
    createUser,
    login,
  },
  Subscription: {
    userCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('USER_CREATED'),
        (payload, variables) => {
          // payload is the payload of the event that was published.
          // variables is an object containing all arguments the client provided when initiating their subscription.
          // Only push an update if the comment is on
          // the correct repository for this operation
          // return payload.commentAdded.repository_name === variables.repoFullName;
          return payload.user.email === variables.email;
        },
      ),
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
