'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    env: 'development',
    DATABASE_NAME: process.env.DATABASE_NAME || 'aloMechanic',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || "ammama",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "ammama",
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mssql' ,
    KaveNegarAPI: '514830375257625633586670453161514732456A35624963683430433374456E',
    SERVER_ADDRESS: '127.0.0.1:8084'
};
module.exports = exports['default'];