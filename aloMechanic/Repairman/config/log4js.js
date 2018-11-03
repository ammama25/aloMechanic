import log4js from 'log4js';
import path from 'path';
import fs from 'fs';

const logRoot = path.join(__dirname, '../../log');
const logDirectory = logRoot + '/debugs';


// ensure log directory exists
fs.existsSync(logRoot) || fs.mkdirSync(logRoot);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

log4js.configure({
    appenders: {
        file: { type: 'dateFile', filename: logDirectory + '/debug.log', pattern: '.yyyy-MM-dd', compress: true},
        console: { type: 'console' } 
    },
    categories: { default: { appenders: ['file', 'console'], level: 'trace' } }
});
const logger = log4js.getLogger();
export default logger;