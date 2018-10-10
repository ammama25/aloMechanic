'use strict'

module.exports = (sequelize, DataTypes) => {
    const vehicle = sequelize.define('vehicle', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        modelId:{
            type: DataTypes.UUID,
            required:true,
       

        },
        brandId: {
            type: DataTypes.UUID,
            required: true,
          
        },
        type: {
            type: DataTypes.ENUM,
            values: ['motorcycle', 'car']
         
        },
        year: {
            type: DataTypes.INTEGER,
            required: true

        },
        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true,
        }

    
    });
    return vehicle;
};
