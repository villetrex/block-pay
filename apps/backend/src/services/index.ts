import { TransactionService } from './transactions';
import { UserService } from './users';

export default {
  userService: new UserService(),
  transactionService: new TransactionService(),
};
