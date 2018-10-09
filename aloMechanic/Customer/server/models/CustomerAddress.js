'use strict'

module.exports = (sequelize, DataTypes) => {
    const customerAddress = sequelize.define('customerAddress', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        customerId: {
            type: DataTypes.UUID,
            required: true ,
            references: {
                model: "Customer",
                key: "id"
            }
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
    return customerAddress;
};
