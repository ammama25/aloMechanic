
'use strict'


module.exports = (sequelize, DataTypes) => {
    const brand = sequelize.define('brand', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
           
        },
        name:{
            type: DataTypes.STRING,
            required:true,
        }
    
    });
    return brand;
};

