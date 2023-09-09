const config = require('../config');

const getConnection = () =>
{
    const client =  "oracledb";
    const connectString = config.sql.connectString;
    const user =  config.sql.user;
    const password =  config.sql.paswd;

    const knex = require('knex')({
        client: client,
        connection: {
            connectString: connectString,
            user: user,
            password: password
        }
    });
    
    return knex;
}
module.exports = {
    database: {
        getConnection
    }
}