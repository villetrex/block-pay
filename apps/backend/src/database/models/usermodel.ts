import { DatTypes, Sequelize } from 'sequelize-typescript';

export type UserModelAttributes = {
  email?: string;
  password?: string;
};

export type UserModelInstance = {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  password: string;
};

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const UserModel = sequelize.define('UserModel', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  UserModel.associate = function (models) {
    // associations can be defined here
  };

  return UserModel;
};
