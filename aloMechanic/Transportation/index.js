
import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const grossAmountAppHandler = require('./server/controllers/grossAmount');


db.sequelize.sync().then(() => {
    console.log('DB is connected');
});


//const PATH = env.SERVER_ADDRESS;
const PATH = '127.0.0.1:8090';

const createServer = function (bindPath, handler) {
    loader.load('transportation.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.grossAmount_app_package.grossAmount.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Server running on 8090');
        });
}

createServer(PATH, new grossAmountAppHandler);


// export default app;
