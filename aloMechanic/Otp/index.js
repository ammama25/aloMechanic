import db from './config/sequelize';
import env from './config/env/development';
const grpc = require('grpc');
const loader = require('@grpc/proto-loader');
const OtpAppHandler = require('./server/controllers/Otp');

db.sequelize.sync().then(() => {
    console.log('OTP DB is connected');
});

const PATH = env.SERVER_ADDRESS;

const createServer = function (bindPath, handler) {
    loader.load('Otp.proto')
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            const service = Package.otp_app_package.OtpApp.service;
            const server = new grpc.Server();
            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());
            server.start();
            console.log('OTP running on 8083');
        });
}

createServer(PATH, new OtpAppHandler);

