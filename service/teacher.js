const db = require('../db/teacher')
const config = require ('../config');
const common = require('../utils/utils');
const userDB = require('../db/user');
const logger = require('../service/logger');


let TeacherDetails = async () => {
   try 
   {
      let teachers = await db.getTeacherDetails();

      logger.info({
        teachers : teachers
      });

      return teachers;
   }
   catch (error) 
   {
      logger.error({
         error : error
      });
      return ('there is an error');
   }
}

let createTeacher = async (reqParams) => {
   try 
   {
      let user = await userDB.getUserDetails(reqParams.id);
     logger.info({
         user : user
     });

      let params = {
         salary: reqParams.salary,
         subjectName: reqParams.subjectName,
         uuid: user.uuid,
         userId: user.id
      };

      logger.info({
           params : params
      });

      let teacher = await db.createTeacher(params);

      logger.info({
         teacher : teacher
      });

      return teacher;
   }
   catch (error) 
   {
      logger.error({
        error : error
      });
      return ('there is an error');

   }
}

module.exports = {
    TeacherDetails : TeacherDetails,
    createTeacher : createTeacher
}