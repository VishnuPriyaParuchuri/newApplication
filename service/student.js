const db = require('../db/student');
const common = require('../utils/utils');
const config = require('../config');
const userDB = require('../db/user');
const logger = require('../service/logger');

let StudentDetails = async () => {
  try 
  {
    let student = await db.getStudentDetails();

    logger.info({
       student : student
    });

    return student;
  }
  catch (error) 
  {
    logger.error({
      error : error
    });
    return ('there is an error');
  }
}

let createStudent = async (reqParams) => {
  try 
  {
    let user = await userDB.getUserDetails(reqParams.id);
    logger.info({
        user : user
    });

    let params = {
      userId: user.id,
      address: reqParams.address,
      uuid: user.uuid
    };

    logger.info({
      params : params
    });
    let student = db.createStudent(params);

    logger.info({
      student : student
    });

    return student;
  }
  catch (error) 
  {
    logger.error({
      error : error
    });
    return 'there is an error';
  }
}

module.exports = {
    StudentDetails : StudentDetails,
    createStudent : createStudent
}