import { UserService } from 'backend/src/services/users';
import { GraphQLError } from 'graphql';

import { LoginData, User } from 'src/generated/graphql';

export class UserController {
  getUsers = async (): Promise<User[]> => await new UserService().getUsers();

  createUser = async (user: User): Promise<User> => await new UserService().createUser(user);

  graphqlLogin = async ({
    email,
    password,
    ctx,
  }: {
    email: string;
    password: string;
    ctx: any;
  }): Promise<LoginData> => {
    const { user: data, info } = await ctx.authenticate('graphql-login', {
      email,
      password,
    });

    if (!data?.user) {
      throw new GraphQLError(info.message, {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });
    }
    return { user: data.user, authTokens: data.authTokens };
  };
}
