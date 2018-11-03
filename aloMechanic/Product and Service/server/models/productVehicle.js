'use strict'

module.exports = (sequelize, DataTypes) => {
    const productVehicle = sequelize.define('productVehicle', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        productAndServiceId:{
            type: DataTypes.INTEGER,
            required: true
        },
        vehicleId: {
            type: DataTypes.INTEGER,
            required: true
        },
        price:{
            type: DataTypes.INTEGER
        }
    });
    return productVehicle;
};
