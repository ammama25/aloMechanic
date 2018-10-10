'use strict'

module.exports = (sequelize, DataTypes) => {
    const customerVehicle = sequelize.define('CustomerVehicle', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        vehicleId:{
            type: DataTypes.UUID,
            required:true,
       

        },
        customerId: {
            type:DataTypes.UUID,
            required: true,
         
        },
        plateNo: {
            type: DataTypes.STRING,
            required: true,
         
        },

        color: {
            type: DataTypes.STRING,
            required: true,
         
        },
        mileage: {
            type: DataTypes.INTEGER,
            required: true,
         
        },
        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true,
        }

    
    });
    return customerVehicle;
};
