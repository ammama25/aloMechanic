'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('./env');

var sequelize = new _sequelize2.default(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    operatorsAliases ,
    define: {
        underscored: true
    }
});

var db = {};

db.Sequelize = _sequelize2.default;
db.sequelize = sequelize;


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



db.vehicle = require('../server/models/vehicle')(sequelize, _sequelize2.default);
db.model = require('../server/models/model.js')(sequelize, _sequelize2.default);
db.brand = require('../server/models/brand.js')(sequelize, _sequelize2.default);
db.customerVehicle=require("../server/models/cutomerVehicle")(sequelize, _sequelize2.default);

// //Relations
// //vehicle-model
// db.model.belongsTo(db.vehicle);
// db.vehicle.hasMany(db.model);



// //vehicle-brand
// db.brand.belongsTo(db.vehicle);
// db.vehicle.hasMany(db.brand);

// //////////
// //customer-vehicle
// db.vehicle.belongsTo(db.customerVehicle);
// db.customerVehicle.hasMany(db.vehicle);





//Models/tables

module.exports = db;