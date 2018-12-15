
'use strict'

module.exports = (sequelize, DataTypes) => {
    const finishCodeRecord = sequelize.define('finishCodeRecord', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        repairmanId: {
            type: DataTypes.INTEGER,
            required: true
        },
        code: {
            type: DataTypes.INTEGER,
            required: true

        },
        isUsed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    return finishCodeRecord;
};
