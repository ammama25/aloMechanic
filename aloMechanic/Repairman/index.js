import logger from './config/log4js';
import config from './config/env';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const RepaimanAppHandler = require('./server/controllers/Repairman');

db.sequelize.sync().then(() => {
    logger.info(`Repairman db is connected`);
});



const PATH = '127.0.0.1:8093';

const createServer = function (bindPath, handler) {
    loader.load('Repairman.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.repaiman_app_package.RepairmanApp.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Customer running on 8083');
        });
}

createServer(PATH, new RepaimanAppHandler);


