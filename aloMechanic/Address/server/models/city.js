
'use strict'

module.exports = (sequelize, DataTypes) => {
    const city = sequelize.define('city', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            required: true
        }
    });
    return city;
};
