
import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const productandServiceAppHandler = require('./server/contollers/productandService.js');


db.sequelize.sync().then(() => {
    console.log('productandService DB is connected');
});

const PATH = env.SERVER_ADDRESS;

const createServer = function (bindPath, handler) {
    loader.load('productandService.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.productandservice_app_package.productandservice.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('ProductandService running on 8091');
        });
}

createServer(PATH, new productandServiceAppHandler );


// export default app;
