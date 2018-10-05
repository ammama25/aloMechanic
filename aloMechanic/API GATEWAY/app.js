import app from './config/express';
import config from './config/env';
import logger from './config/log4js';

app.listen(config.NODE_PORT, () => {
    logger.info(`API Server started and listening on port ${config.NODE_PORT}`);
});
