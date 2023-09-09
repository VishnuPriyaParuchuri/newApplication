const express = require('express');

const app = express();
const config = require ('../config');
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
const {userType} = require('../utils/constants');
const Authentication = require('../service/authentication');


let userService = require('../service/user');
let teacherService = require('../service/teacher');
let studentService = require('../service/student');
let axiosService = require('../service/axios');



app.post('/api/create/user', async(req,res) =>
{
  return res.json(await userService.createUser(req.body));
})

app.post('/api/signin', async(req,res) =>{
  return res.json(await userService.UserSignInAccount(req.body))
});


let myInit = async (req, res, next) => 
{
	try
	{

		let smRole = req.headers['role'];
		let smToken = req.headers['smtoken'];


		if (!smToken)
		{
			return res.json({
				status: 0,
				message: "Authorization is required."
			});
		}
		else if (smToken)
		{
	
			await Authentication.validateToken(smToken, async function (tokenResult) 
			{
				if (tokenResult.status == 1)
				{
					let tokenUser = tokenResult.user;
					
					
					let newToken = await Authentication.generateToken(tokenUser);

					if (newToken)
					{
						res.append('newtoken', newToken);

						req.tokens = {
							...req.tokens,
							smtoken: newToken,
							role: smRole
						};
					}

					req.smUser = tokenUser;
					req.authId = tokenUser.uuid || null;

					let userRole = req.smUser.role;
               
					if(userRole.search(smRole) < 0)
					{
						
						return res.json({
							status: 0,
							message: "Authorization failed: Do not have access for this API"
						});
					}

					next();
				}
				else if (tokenResult.status == 0)
				{
					
					return res.json(tokenResult);
				}
			});
		}
	}
	catch (error)
	{
	
		return res.json({
			status: 0,
			message: error.message,
		});
	}
};

app.use(myInit);



app.get('/api/teacher/data', async(req,res) => {
    return res.json(await teacherService.TeacherDetails());
})

app.get('/api/student/details', async(req,res) =>
{
    return res.json(await studentService.StudentDetails());
})

// app.post('/api/create/user', async(req,res) =>
// {
//   return res.json(await userService.createUser(req.body));
// })

app.post('/api/create/teacher', async(req,res) =>
{
  return res.json(await teacherService.createTeacher(req.body));
})

app.post('/api/create/student', async(req,res) =>
{
  return res.json (await studentService.createStudent(req.body));
})

app.get('/api/teacher/details', async(req,res) =>
{
  return res.json(await axiosService.getTeacherDetails(req.tokens));
})

app.get('/api/user/details', async(req,res) =>
{
  return res.json(await axiosService.getUserDetails(req.tokens));
})

app.post('/api/update/user',Authentication.authorize([userType.TEACHER,userType.STUDENT]), async(req,res) =>
{
  return res.json(await userService.updateUser(req.body, req.smUser));
})




module.exports = app;