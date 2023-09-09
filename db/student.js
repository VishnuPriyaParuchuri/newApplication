const Student = require('../db/model/student');

let getStudentDetails = async() =>
{
    return await Student.query().select();
}

let createStudent = async(data) =>
{
  return await Student.query().insert(data);
}
module.exports = {
    getStudentDetails : getStudentDetails,
    createStudent : createStudent
}