const Teacher = require('../db/model/teacher');


let getTeacherDetails = async() =>
{
    return await Teacher.query().select();
}

let createTeacher = async(data) =>
{
   return await Teacher.query().insert(data);
}

module.exports = {
    getTeacherDetails : getTeacherDetails,
    createTeacher : createTeacher
}