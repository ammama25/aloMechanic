'use strict'

module.exports = (sequelize, DataTypes) => {
    const repairman = sequelize.define('repairman', {
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
    return repairman;
};
