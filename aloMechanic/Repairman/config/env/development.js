'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    env: 'development',
    jwtSecret: 'mozi-amoo',
    jwtDuration: '24 hours',
    DATABASE_NAME: process.env.DATABASE_NAME || 'aloMechanic',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || "ammama",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "ammama",
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mssql'
};
module.exports = exports['default'];