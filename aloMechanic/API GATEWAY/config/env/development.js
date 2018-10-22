export default {
    env                              : 'development',
    NODE_PORT                        : 3000,
    jwtSecret                        : 'mozi-amoo',
    jwtDuration                      : '30000 hours',
    DATABASE_NAME                    : process.env.DATABASE_NAME || 'aloMechanic',
    DATABASE_HOST                    : process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME                : process.env.DATABASE_USERNAME || "ammama",
    DATABASE_PASSWORD                : process.env.DATABASE_PASSWORD || "ammama",
    DATABASE_DIALECT                 : process.env.DATABASE_DIALECT || 'mssql' ,
    OTP_SERVER_ADDRESS               : '127.0.0.1:8084' ,
    CUSTOMER_SERVER_ADDRESS          : '127.0.0.1:8083' ,
    VEHICLE_SERVER_ADDRESSS          : '127.0.0.1:8088',
    PROMOTION_SERVER_ADDRESS         : '127.0.0.1:8089',
    TRANSPORTATION_SERVER_ADDRESS    : '127.0.0.1:8090',
    PRODUCTANDSERVICE_SERVER_ADDRESS : '127.0.0.1:8091',
    ORDER_SERVER_ADDRESS             : '127.0.0.1:8092',

};