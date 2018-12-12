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
            values: ["10", "20", "30", "40", "50", "60"],
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
