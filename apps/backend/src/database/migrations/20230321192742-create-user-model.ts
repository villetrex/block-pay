import { QueryInterface, SequelizeStatic } from 'sequelize';

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable('UserModels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      email: {
        type: Sequelize.STRING,
      },

      password: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.dropTable('UserModels');
  },
};
