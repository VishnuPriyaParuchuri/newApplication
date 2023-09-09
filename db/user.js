const User = require('../db/model/user');

let getUserData = async() =>
{
  return await User.query().select();
}

let getUserDetails = async(id) =>
{
  return await User.query().select().where('id', id).first();
}

let createUser = async(data) =>
{
  return await User.query().insert(data);
}

let getUserExistingData = async(email) =>
{
  return await User.query().select().where('email', email);
}

let getUserByEmail = async(email, password) =>
{
  return await User.query().select().where({ email : email, password : password}).first();
}

let updateUser = async(id,data) => 
{
  return await User.query().patchAndFetchById(id, data);
}

module.exports = {
    getUserData :  getUserData,
    getUserDetails : getUserDetails,
    createUser : createUser,
    getUserExistingData : getUserExistingData,
    getUserByEmail : getUserByEmail,
    updateUser : updateUser
}
