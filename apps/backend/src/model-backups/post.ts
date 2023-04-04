import { DataTypes, Sequelize } from "sequelize";

export type PostAttributes = {
  title?: string;
  content?: string;
  userId?: number;
};

export type PostInstance = {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  title: string;
  content: string;
  userId: number;
};

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  });

  Post.associate = function (models) {
    // associations can be defined here
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE",
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE",
    });
  };

  return Post;
};
