"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        postId: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
    });
    Comment.associate = function (models) {
        // associations can be defined here
    };
    return Comment;
};
