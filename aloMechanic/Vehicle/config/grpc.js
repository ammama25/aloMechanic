const grpc = require('grpc');
const loader = require('@grpc/proto-loader');

function grpcSetup(protoAddress ,callback){
    loader.load(protoAddress)
        .then((packageDefinition) => {
            const Package = grpc.loadPackageDefinition(packageDefinition);
            callback(Package)
    })
}

export default grpcSetup 

