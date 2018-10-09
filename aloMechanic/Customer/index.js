import app from './config/express';
import logger from './config/log4js';
import config from './config/env';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const CustomerAppHandler = require('./server/controllers/Customer');

db.sequelize.sync().then(() => {
    logger.info(`db is connected`);
});


const PATH = '127.0.0.1:8083';

const createServer = function (bindPath, handler) {
    loader.load('Customer.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.customer_app_package.CustomerApp.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Server running on 8083');
        });
}

createServer(PATH, new CustomerAppHandler);


// export default app;
