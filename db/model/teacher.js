const { Model } = require("../db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class Teacher extends guid(Model)
{
    static get tableName()
    {
        return `${tables.teacher}`;
    } 
}


module.exports = Teacher;