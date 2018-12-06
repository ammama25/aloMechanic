import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const transportationAppHandler = require('./server/controllers/transportation');


db.sequelize.sync().then(() => {
    console.log('transportation DB is connected');
});

//const PATH = env.SERVER_ADDRESS;
const PATH = '127.0.0.1:8090';

const createServer = function (bindPath, handler) {
    loader.load('transportation.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.transportation_app_package.transportation.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('transportation running on 8090');
        });
}

createServer(PATH, new transportationAppHandler);


// export default app;
