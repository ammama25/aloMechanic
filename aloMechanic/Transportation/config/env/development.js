'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
export default {
    env: 'development',
    NODE_PORT: 3900,
    DATABASE_NAME: process.env.DATABASE_NAME || 'alomechanic',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || "ammama",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "ammama",
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql' ,
    SERVER_ADDRESS: '127.0.0.1:8090',
};

module.exports = exports['default'];