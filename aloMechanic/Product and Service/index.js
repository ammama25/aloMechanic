import db from './config/sequelize';

db.sequelize.sync().then(() => {
    console.log('DB is connected');
});


// export default app;
