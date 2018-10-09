'use strict'

module.exports = (sequelize, DataTypes) => {
    const district = sequelize.define('district', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cityId: {
            type: DataTypes.INTEGER,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return district;
};
