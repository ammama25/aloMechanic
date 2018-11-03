'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var env = process.env.NODE_ENV || 'development';
var config = require('./' + env);

exports.default = config;
module.exports = exports['default'];