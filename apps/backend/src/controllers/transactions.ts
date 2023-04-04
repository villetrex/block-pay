import { TransactionService } from 'backend/src/services/transactions';

export class TransactionController {
  getTransactions = () => new TransactionService().getTransactions();
}
