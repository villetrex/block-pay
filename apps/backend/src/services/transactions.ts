import dayjs from '@villetrex/dayjs';

export class TransactionService {
  getTransactions = () => [
    { sender: 'Louis', receiver: 'Louis', spender: 'me', createdAt: dayjs().toISOString() },
    { sender: 'Louis', receiver: 'Louis', spender: 'me', createdAt: dayjs().toISOString() },
  ];
}
