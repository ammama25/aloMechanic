'use strict'

module.exports = (sequelize, DataTypes) => {
    const repairmanCategory = sequelize.define('repairmanCategory', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        repairmanId:{
            type:DataTypes.STRING,
            required:true,
            unique: true
        }
    });
    return repairmanCategory;
};

