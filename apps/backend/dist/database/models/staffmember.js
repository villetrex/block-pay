"use strict";
module.exports = (sequelize, DataTypes) => {
    const StaffMember = sequelize.define('StaffMember', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
    }, {
        freezeTableName: true,
        classMethods: {
            associate(models) {
                // associations can be defined here
            },
        },
    });
    return StaffMember;
};
