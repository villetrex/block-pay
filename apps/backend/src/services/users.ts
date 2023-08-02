import UserModel from 'backend/src/models/user.model';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

import { User } from 'src/generated/graphql';

export class UserService {
  getUsers = async (): Promise<User[]> => await UserModel.findAll();

  createUser = async (user: User): Promise<User> => {
    const fields = Object.entries(user);
    const { email, password } = user;
    try {
      fields.forEach(field => {
        if (isEmpty(field[1] as string)) {
          throw new Error(`${field[0]} cannot be empty`);
        }
      });
      if (!isEmail(email)) {
        throw new Error('invalid email address');
      } else if (!/^[a-z0-9$#%*]+$/i.test(password)) {
        throw new Error('password must be alphanumeric');
      }

      return await UserModel.create(user);
    } catch (err: any) {
      throw err;
    }
  };
}
