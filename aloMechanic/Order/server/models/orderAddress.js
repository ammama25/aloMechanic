'use strict'

module.exports = (sequelize, DataTypes) => {
    const orderAddress = sequelize.define('orderAddress', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        orderId: {
            type: DataTypes.INTEGER,
            required: true
        },
        districtId: {
            type: DataTypes.INTEGER,
            required: true
        },
        address: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        }
    });
    return orderAddress;
};
