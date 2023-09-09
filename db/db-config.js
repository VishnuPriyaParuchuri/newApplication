const { database } = require("../api/dbconnection"); 
const knex = database.getConnection();

const { Model } = require('objection');
Model.knex(knex);

module.exports = { Model, knex };