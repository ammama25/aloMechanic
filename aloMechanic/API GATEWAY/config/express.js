import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';
import path from 'path';
import uuid from 'uuid';
import bodyParser from 'body-parser';
import expressValidation from 'express-validation';
import routes from '../server/routes';
import logger from './log4js';

const logRoot = path.join(__dirname, '../../log');
const logDirectory = logRoot + '/requests';


// ensure log directory exists
fs.existsSync(logRoot) || fs.mkdirSync(logRoot);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    size: '10M',
    compress: true,
    interval: '1d', // rotate daily
    path: logDirectory
});

// create a rotating write stream
const errorLogStream = rfs('error.log', {
    size: '10M',
    compress: true,
    interval: '1d', // rotate daily
    path: logDirectory
});

// use custom token formats
// Sample app that will use custom token formats. This adds an ID to all requests and displays it using the :id token
morgan.token('id', function getId (req) {
    return req.id;
});

// creating express instance
const app = express();
var cors = require('cors')
app.use(cors);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(assignId)
app.use(express.static(__dirname));
function assignId (req, res, next) {
    req.id = uuid.v4();
    next();
}

// log only 4xx and 5xx responses to errorFile
app.use(morgan(':id :remote-addr :remote-customer :req[header] [:date[clf]] ":method :url :http-version" :status :response-time[4]ms ":res[header]" ":customer-agent"', {
    stream: errorLogStream,
    skip: function (req, res) { return res.statusCode < 400; }
}));

// setup the request logger
app.use(morgan('combined', {stream: accessLogStream}));

// Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.


app.use(bodyParser.json());
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
// Here we configure two parsers, one for json request bodies (where Content-Type is application/json) and one for urlencoded (where Content-Type is x-ww-form-urlencoded).
app.use(bodyParser.urlencoded({ extended:true}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// mount all routes on /api path
app.use('/api', routes);


// express-validation provides a middleware function that can validate the request payload data given a set of rules provided by us.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        logger.error("id: " + req.id + " status: " + err.status + " err: " + JSON.stringify(err));
        res.status(err.status).json(err);
    } else {
        logger.error("id: " + req.id + " status: 500" + " err: " + JSON.stringify(err));
        res.status(500)
            .json({
                status: err.status,
                message: err.message
            });
    }
});


export default app;






