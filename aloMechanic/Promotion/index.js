
import env from './config/env/development';
import db from './config/sequelize';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const promotionAppHandler = require('./server/controllers/promotion');


db.sequelize.sync().then(() => {
    console.log('Promotion DB is connected');
});


const PATH = env.SERVER_ADDRESS;

const createServer = function (bindPath, handler) {
    loader.load('promotion.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.promotion_app_package.promotion.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('Promotion running on 8089');
        });
}

createServer(PATH, new promotionAppHandler);


// export default app;
