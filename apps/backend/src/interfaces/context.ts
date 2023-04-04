import { TransactionController } from 'backend/src/controllers/transactions';
import { UserController } from 'backend/src/controllers/users';
import { User } from 'backend/src/generated/graphql';
import { Request as ExpressRequest } from 'express';
import { PassportContext, PassportSubscriptionContext } from 'graphql-passport';

export type DataSources = {
  controllers: { userController: UserController; transactionController: TransactionController };
};

export type Context = {
  dataSources: DataSources;
} & PassportContext<User, ExpressRequest>;

export type ProjectSubscriptionContext = {
  dataSources: DataSources;
} & PassportSubscriptionContext<User, ExpressRequest>;
