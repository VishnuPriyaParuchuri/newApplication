const db = require('../db/user');
const config = require('../config');
const common = require('../utils/utils');
const Authentication = require('../service/authentication');
const logger = require('../service/logger');

// let createUser = async (reqParams) => {
//     try 
//     {
//         let uuid = common.gtUniqueId();

//         let email = reqParams.email.toLowerCase();

//          logger.info({
//            email : email
//         });
//         let params = {
//             name: reqParams.name,
//             password: reqParams.password,
//             role: reqParams.role,
//             uuid: uuid,
//             createdAt: new Date(),
//             createdBy: uuid,
//             email: email
//         }
//          logger.info({
//           params : params
//         });

//         let user = await db.createUser(params);

//         logger.info({
//         user : user
//         });

//         return user;
//     }
//     catch (error)
//     {
//         logger.error({
//            error : error
//         });
//         return 'there is an error';
//     }
// }

let createUser = async (reqParams) => {
    try 
    {
        let email = reqParams.email.toLowerCase();

        logger.info({
          email : email
        });

        let exisitingUserDetails = await db.getUserExistingData(email);

        logger.info({
            exisitingUserDetails : exisitingUserDetails
        });

        if (!exisitingUserDetails)
        {
            logger.warn({
                exisitingUserDetails : exisitingUserDetails
            });
            return {
                status: 0,
                message: 'User already exist.'
            }
        }
        let uuid = common.gtUniqueId();

        let params = {
            name: reqParams.name,
            password: reqParams.password,
            uuid: uuid,
            email: email,
            createdAt: new Date(),
            createdBy: uuid
        };

        logger.info ({
          params : params
        });

        if ((reqParams.role == 'teacher')) 
        {
            params.role = JSON.stringify(["TEACH"])
        }
        else if ((reqParams.role == 'student')) 
        {
            params.role = JSON.stringify(["STUD"])
        }
        else 
        {
            params.role = JSON.stringify(["ADMIN"])
        }

        let users = await db.createUser(params);

        logger.info({
           users : users
        });

        let tokenUser = {
            id: users.id,
            name: users.name,
            email: users.email,
            role: users.role,
            uuid: users.uuid
        };

        logger.info({
            tokenUser : tokenUser
        });

        let token = await Authentication.generateToken(tokenUser);

        logger.info({
          token : token
        });

        let data = {
            ...tokenUser,
            token: token
        }

        logger.info({
          data : data
        });

        return {
            status: 1,
            user: data
        }
    }
    catch (error) 
    {
        logger.error({
          error : error
        });
        return ('there is an error');
    }
}

const UserSignInAccount = async (reqParams) => {
    try 
    {
        let email = reqParams.email;
        let password = reqParams.password;
        
        console.log({
          email : email,
          password : password
        });
        
        let userDetails = await db.getUserByEmail(email, password);

        logger.info({
            userDetails : userDetails
        });
        
        if (!userDetails) 
        {
            logger.warn({
                userDetails : userDetails
            });
            return {
                status: 0,
                message: "User details incorrect."
            };
        }

        let tokenUser = {
            name: userDetails.name,
            email: userDetails.email,
            role: userDetails.role,
            uuid: userDetails.uuid
        };

        logger.info({
            tokenUser : tokenUser
        });

        let token = await Authentication.generateToken(tokenUser);

        logger.info({
          token : token
        });

        data = {
            ...tokenUser,
            token: token
        };

        logger.info({
          data : data
        });

        return {
            status: 1,
            user: data,
            message: "User login successfully."
        };
    }
    catch (error)
    {
        console.log('error', error);
        return error;
    }
};

let updateUser = async(reqParams, owner) =>
{
  try
  {
    let id = reqParams.id ? reqParams.id : null;
    if(!id)
    {
      logger.warn({
         id : id
        });

        return " id is required";
    }

    let params = {
       name : reqParams.name,
       email: reqParams.email,
       updatedAt : new Date(),
       updatedBy : owner.uuid
    };

    logger.info({
       params : params
    });

    let updateUserDetails = await db.updateUser(id, params);
    
    logger.info({
        updateUserDetails : updateUserDetails
    });

    return updateUserDetails;
  }
  catch(error)
  {
    logger.error({
       error : error
    });

    return " there is an error";
  }
}

module.exports = {
    createUser : createUser, 
    UserSignInAccount : UserSignInAccount,
    updateUser : updateUser
    
}