'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('./env');

var sequelize = new _sequelize2.default(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    define: {
        underscored: true
    }
});

var db = {};

db.Sequelize = _sequelize2.default;
db.sequelize = sequelize;

//Models/tables
db.customer = require('../server/models/Customer')(sequelize, _sequelize2.default);
db.city = require('../server/models/City')(sequelize, _sequelize2.default);
db.district = require('../server/models/District')(sequelize, _sequelize2.default);
db.customerAddress = require('../server/models/CustomerAddress')(sequelize, _sequelize2.default);

db.customer.hasMany(db.customerAddress, {foreignKey: 'customerId' , sourceKey: 'id'})

module.exports = db;    