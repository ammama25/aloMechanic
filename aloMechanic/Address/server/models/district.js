
'use strict'

module.exports = (sequelize, DataTypes) => {
    const district = sequelize.define('district', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        cityId: {
            type: DataTypes.UUID,
            required: true
        },
        name: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return district;
};
