// type Transaction {
//     sender: String
//     reciever: String;
//     spender: String;
//     createdAt: Date
//   }

import { Context } from 'src/interfaces/context';

export const getTransactions: any = async (
  _parent: any,
  args: any,
  {
    dataSources: {
      controllers: { transactionController },
    },
  }: Context,
): Promise<any> => {
  return await transactionController.getTransactions();
};
