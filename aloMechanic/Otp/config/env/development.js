'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    env: 'development',
    DATABASE_NAME: process.env.DATABASE_NAME || 'alomechanic',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || "ammama",
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "ammama",
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'mysql' ,
    KaveNegarAPI: '7166737439586C566364316A4D4D6153776E4C746842354B7066774764764867',
    SERVER_ADDRESS: '127.0.0.1:8084'
};
module.exports = exports['default'];