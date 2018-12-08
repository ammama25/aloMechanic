'use strict'

module.exports = (sequelize, DataTypes) => {
    const productService = sequelize.define('productService', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        time: {
            type: DataTypes.ENUM,
            values: [8, 10, 12,14,16,18],
            required: true
        },
    });
    return productService;
};
