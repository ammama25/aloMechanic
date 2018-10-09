'use strict'

module.exports = (sequelize, DataTypes) => {
    const city = sequelize.define('city', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return city;
};
