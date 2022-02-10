require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'development';
CONFIG.port         = process.env.PORT  || 3008;
CONFIG.appName      = process.env.APP_NAME   || 'Node Task';
CONFIG.baseUrl      = process.env.BASEURL  || 'http://localhost:' + CONFIG.port;
CONFIG.appImageUrl  = process.env.APPIMAGEURL  || 'http://localhost/node_task/public/images/';
CONFIG.imageBaseUrl = process.env.IMAGE_BASE_URL  || 'http://localhost/node_task/';

//** MySQL Creds */
CONFIG.database = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: process.env.DB_QUERY_LOGGING,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}


//** Status Codes */
CONFIG.status_zero  = process.env.STATUS_ZERO || 0; //If error
CONFIG.status_one   = process.env.STATUS_ONE  || 1; //If success
CONFIG.status_two   = process.env.STATUS_TWO  || 2; //If social account not exist/No more data in pagination

//** Header Status Codes */
CONFIG.STATUS_HTTP_OK   = process.env.STATUS_HTTP_OK  || 200;

//** Conf Timezones */
CONFIG.timezone_utc = process.env.TIMEZONE_UTC || 'UTC';

module.exports = CONFIG;
