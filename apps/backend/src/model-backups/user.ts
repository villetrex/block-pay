import { AllowNull, Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @Column
  email!: string;

  @AllowNull
  @Column
  password!: string;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;

  @DeletedAt
  deletionDate?: Date;

  @Column
  get name(): string {
    return 'My name is ' + this.getDataValue('name');
  }

  set name(value: string) {
    this.setDataValue('name', value);
  }

  // @HasMany(() => Hobby)
  // hobbies: Hobby[];
}
