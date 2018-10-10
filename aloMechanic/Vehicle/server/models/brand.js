
'use strict'


module.exports = (sequelize, DataTypes) => {
    const brand = sequelize.define('vehicle', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            required:true,
        }
    
    });
    return brand;
};

