'use strict'
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const customer = sequelize.define('customer', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        mobileNo:{
            type:DataTypes.STRING,
            required:true,
            unique: true
        },
        firstname: {
            type: DataTypes.STRING,
            required: true,
          
        },
        lastname: {
            type: DataTypes.STRING,
            required: true,
         
        },
        password: {
            type: DataTypes.STRING,
            required: true

        },
        email:{
            type:DataTypes.STRING,
        },
        is_active:{
            type: DataTypes.BOOLEAN,
            defaultValue:true,
        }
    },
    {
        hooks: {
          beforeCreate: (customer) => {
            const salt = bcrypt.genSaltSync();
            customer.password = bcrypt.hashSync(customer.password, salt);
          }
        },
        instanceMethods: {
          validPassword:  function(password){
            return bcrypt.compareSync(password, this.password);
          }
        }   
    });

    customer.prototype.validPassword=function(password){
        return bcrypt.compareSync(password, this.password);
    }

    return customer;
};

