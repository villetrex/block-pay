import bcrypt from 'bcrypt';
import {
  BeforeCreate,
  BeforeSave,
  BeforeUpdate,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

import { User } from 'src/generated/graphql';

// @Scopes(() => ({
//   full: {
//     include: ['password'],
//   },
//   yellow: {
//     where: { primaryColor: 'yellow' },
//   },
// }))

export enum UserRole {
  Admin = 'ADMIN',
  Public = 'PUBLIC',
  User = 'USER',
}

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) ?? 10;

// @DefaultScope(() => ({
//   attributes: {
//     exclude: ['password'],
//   },
// }))
@Table
export default class UserModel extends Model {
  @PrimaryKey
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  country!: string;

  @Column
  state!: string;

  @Column
  city!: string;

  @Column
  role!: UserRole;

  @Column
  refreshToken?: string;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;

  @DeletedAt
  deletionDate?: Date;

  @BeforeUpdate
  @BeforeCreate
  @BeforeSave
  static encryptPassword(user: User) {
    user.password = bcrypt.hashSync(user.password.toString() as string, bcrypt.genSaltSync(SALT_ROUNDS));
  }

  validatePassword(password: string) {
    console.log('password', password, 'internal password', this.password.toString());
    const isvalid = bcrypt.compareSync(password, this.password.toString());
    console.log('isvalid', isvalid);
    return isvalid;
  }

  // @Column
  // get name(): string {
  //   return 'My name is ' + this.getDataValue('name');
  // }

  // set name(value: string) {
  //   this.setDataValue('name', value);
  // }

  // @HasMany(() => Hobby)
  // hobbies: Hobby[];
}
