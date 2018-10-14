import app from './config/express';
import logger from './config/log4js';
import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const CustomerVehicleAppHandler = require('./server/controllers/customerVehicle');


db.sequelize.sync().then(() => {
    console.log('DB is connected');
});


const PATH = env.SERVER_ADDRESS;

const createServer = function (bindPath, handler) {
    loader.load('Vehicle.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.CustomerVehicle_app_package.CustomerVehicleApp.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Server running on 8088');
        });
}

createServer(PATH, new CustomerVehicleAppHandler);


// export default app;
