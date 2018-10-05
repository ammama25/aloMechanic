
'use strict'

module.exports = (sequelize, DataTypes) => {
    const otpRecord = sequelize.define('otpRecord', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        mobileNo: {
            type: DataTypes.STRING,
            required: true
        },
        code: {
            type: DataTypes.INTEGER,
            required: true

        },
        expirationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isUsed:{
            type: DataTypes.BOOLEAN
        }
    });
    return otpRecord;
};
