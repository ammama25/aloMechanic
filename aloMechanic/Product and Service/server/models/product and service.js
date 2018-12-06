'use strict'

module.exports = (sequelize, DataTypes) => {
    const productService = sequelize.define('productService', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        parentId:{
            type: DataTypes.INTEGER 
        },
        name: {
            type: DataTypes.STRING,
            required: true
        },
        type: {
            type: DataTypes.ENUM,
            values: ['1', '2', '3'],
            required: true
        },
        description: {
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.INTEGER
        }
    });
    return productService;
};
