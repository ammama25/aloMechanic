'use strict'

module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('order', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        orderNo:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            initialAutoIncrement: 30000
        },
        customerId: {
            type: DataTypes.UUID,
            required: true
        },
        customerVehicle: {
            type: DataTypes.UUID,
            required: true
        },
        grossAmount: {
            type: DataTypes.INTEGER
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            required: true
        },
        discount: {
            type: DataTypes.INTEGER
        },
        transportPrice: {
            type: DataTypes.INTEGER
        },
        paidAmount: {
            type: DataTypes.INTEGER
        }
    });
    return order;
};
