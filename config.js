require('dotenv').config();

const config = require("./config.json");

const environment = 'development';
const environmentConfig = config[environment];



let poolMin = environmentConfig.SQL.POOL.MIN || 0;
let poolMax = environmentConfig.SQL.POOL.MAX || 3;

module.exports = {

    app_name: environmentConfig.APP_NAME || 'New application',
    server_port: config.development.SERVER_PORT,

    sql: {
        client:  environmentConfig.SQL.CLIENT,
        host:  environmentConfig.SQL.HOST,
        user:  environmentConfig.SQL.USER,
        paswd: environmentConfig.SQL.PASWD,
        database:  environmentConfig.SQL.DATABASE,
        owner:  environmentConfig.SQL.OWNER || null,
        connectString:  environmentConfig.SQL.CONNECT_STRING,
        pool: {
            min: Number(poolMin),
            max: Number(poolMax)
        },
        connectionTimeout: process.env.SQL_DB_CONNECTION_TIMEOUT || environmentConfig.SQL.CONNECTION_TIMEOUT
    },


    dbServer: "COMMON",
    upload_files:  __dirname + '/uploads/',
    smtp: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        email: 'priyaparuchuri111@gmail.com',
        paswd: 'jhxxgqtmanggudon',
        sender: 'School management'
    },

    jwt: {
        secret_key: process.env.JWT_SECRET_KEY || (environmentConfig.JWT ? environmentConfig.JWT.SECRET_KEY : null),
        expiresin: process.env.JWT_EXPIRESIN || (environmentConfig.JWT ? environmentConfig.JWT.EXPIRESIN : null),
    },

    encrypt_secret_key: environmentConfig.ENCRYPT_SECRET_KEY || "schoolManagement",

    service_urls: {
        axios: process.env.SCHOOL_MANAGEMENT || environmentConfig.SERVICE_URLS.SCHOOL_MANAGEMENT
    },
}


