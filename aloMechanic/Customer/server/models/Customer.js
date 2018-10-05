'use strict'

module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        mobileNo:{
            type:DataTypes.STRING,
            required:true
        },
        firstname: {
            type: DataTypes.STRING,
            required: true
        },
        lastname: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true

        },
        email:{
            type:DataTypes.STRING,
        },
        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true,
        }
    });
    return customer;
};
