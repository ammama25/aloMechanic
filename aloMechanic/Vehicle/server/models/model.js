
'use strict'


module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('model', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
           
        },
        name:{
            type: DataTypes.STRING,
            required:true,
        }
    
    });
    return model;
};

