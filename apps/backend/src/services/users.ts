import UserModel from 'backend/src/models/user.model';

import { User } from 'src/generated/graphql';

export class UserService {
  getUsers = async (): Promise<User[]> => {
    const users = await UserModel.findAll();
    return users;
  };

  createUser = async ({ email, password, firstName, lastName, country, state, city, role }: any): Promise<User> => {
    try {
      const user = await UserModel.create({ email, password, firstName, lastName, country, state, city, role });
      return user;
    } catch (err: any) {
      throw new Error(err.errors[0].message);
    }
  };
}
