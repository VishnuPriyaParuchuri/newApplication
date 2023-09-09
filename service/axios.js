const axios = require('axios');

const config = require('../config');

const serviceUrls = config.service_urls;

const baseUrl = serviceUrls.axios;
const common = require('../utils/utils')

let getRequest = async (url, tokens=null) => 
{
	try
	{
	
		let smtoken = tokens && tokens.smtoken ? tokens.smtoken : '';
		let role = tokens && tokens.role ? tokens.role : '';
	
		let headers = {
			headers: {
				smtoken: smtoken,
				role: role
			}
		};

		let result = await axios.get(baseUrl + url, headers);
      

		return result.data;
	}
	catch (error)
	{



        
		let err = error && error.response && error.response.data ? error.response.data : error;

		return {
			status: Status.FAIL,
			message: err.message,
			error: err
		};
	}
};

let getTeacherDetails = async(tokens = null) =>
{
  let result = await getRequest('/api/teacher/data', tokens);

  return result;
}

let getUserDetails = async(tokens = null) =>
{
  let result = await getRequest('/api/users/data', tokens);

  return result;
}


module.exports = {
    getTeacherDetails : getTeacherDetails,
    getUserDetails : getUserDetails
}