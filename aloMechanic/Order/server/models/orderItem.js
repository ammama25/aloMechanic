'use strict'

module.exports = (sequelize, DataTypes) => {
    const orderItem = sequelize.define('orderItem', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        orderId: {
            type: DataTypes.UUID,
            required: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            required: true
        },
        serviceId: {
            type: DataTypes.INTEGER,
            required: true
        },
        productId: {
            type: DataTypes.INTEGER,
            required: true
        },
        categoryPrice: {
            type: DataTypes.INTEGER
        },
        servicePrice: {
            type: DataTypes.INTEGER
        },
        productPrice: {
            type: DataTypes.INTEGER
        },
        totalPrice: {
            type: DataTypes.STRING,
            required: true
        }
        
    });
    return orderItem;
};
