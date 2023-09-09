const { Model } = require("../db-config");
const guid = require('objection-guid')();
const tables = require('./table');

class Student extends guid(Model)
{
    static get tableName()
    {
        return `${tables.student}`;
    } 
}

module.exports = Student;