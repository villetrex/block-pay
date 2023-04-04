import { TransactionController } from './transactions';
import { UserController } from './users';

export default {
  userController: new UserController(),
  transactionController: new TransactionController(),
};
