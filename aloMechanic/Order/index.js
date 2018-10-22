
import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const productandServiceAppHandler = require('./server/contollers/controller.js');


db.sequelize.sync().then(() => {
    console.log('DB is connected');
});


const PATH = env.SERVER_ADDRESS;

const createServer = function (bindPath, handler) {
    loader.load('order.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.order_app_package.orderApp.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Server running');
        });
}

createServer(PATH, new productandServiceAppHandler );


// export default app;
