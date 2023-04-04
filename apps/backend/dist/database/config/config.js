"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
exports.default = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: "postgres",
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: "postgres",
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: "postgres",
    },
};
// export default {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
