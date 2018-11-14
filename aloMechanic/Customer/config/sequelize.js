'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('./env');

var sequelize = new _sequelize2.default(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    dialectOptions: {
        encrypt: true
    },
    operatorsAliases ,
    define: {
        underscored: true
    }
});

var db = {};

const Op = _sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

db.Sequelize = _sequelize2.default;
db.sequelize = sequelize;

//Models/tables
db.customer = require('../server/models/Customer')(sequelize, _sequelize2.default);
db.city = require('../server/models/City')(sequelize, _sequelize2.default);
db.district = require('../server/models/District')(sequelize, _sequelize2.default);
db.customerAddress = require('../server/models/CustomerAddress')(sequelize, _sequelize2.default);

db.customer.hasMany(db.customerAddress, {foreignKey: 'customerId' , sourceKey: 'id'})

module.exports = db;    