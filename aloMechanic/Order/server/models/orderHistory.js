'use strict'

module.exports = (sequelize, DataTypes) => {
    const orderHistory = sequelize.define('orderHistory', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        orderId: {
            type: DataTypes.INTEGER,
            required: true
        },
        state:{
            type: DataTypes.ENUM,
            values: ["new", "cancel", "confirm", "done"],
            required: true
        },
        desc: {
            type: DataTypes.STRING
        },
        updatedBy: {
            type: DataTypes.STRING
        }
    });
    return orderHistory;
};
