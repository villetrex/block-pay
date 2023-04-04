// import { PubSub } from 'graphql-subscriptions';

import {
  LoginData,
  MutationCreateUserArgs,
  MutationLoginArgs,
  MutationResolvers,
  QueryResolvers,
  User,
} from 'src/generated/graphql';
import { Context } from 'src/interfaces/context';

export const getUsers: QueryResolvers['getUsers'] = async (
  _parent: any,
  args: any,
  {
    dataSources: {
      controllers: { userController },
    },
  }: Context,
): Promise<User[]> => {
  // createPost(parent, args, { postController }) {
  //   // Datastore logic lives in postController
  //   pubsub.publish("POST_CREATED", { postCreated: args });
  //   return postController.createPost(args);
  // },
  // const pubsub = new PubSub();
  // pubsub.publish('USER_CREATED', { user: args });
  return await userController.getUsers();
};

export const createUser: MutationResolvers['createUser'] = async (
  _parent: any,
  args: MutationCreateUserArgs,
  {
    dataSources: {
      controllers: { userController },
    },
  }: Context,
): Promise<User> => {
  return await userController.createUser(args);
};

export const login: MutationResolvers['login'] = async (
  _parent: any,
  { email, password }: MutationLoginArgs,
  ctx: Context,
): Promise<LoginData> => {
  return await ctx.dataSources.controllers.userController.graphqlLogin({ email, password, ctx });
};
