const { Model } = require('objection');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
function gtUniqueId()
{
    return uuidv4().split('-').join('').toUpperCase();
}

const isFileReNamed = (directory, oldName, newName) => 
{
	try
	{
		fs.renameSync(oldName, newName);

		return true;
	}
	catch (error)
	{
		return false;
	}
};

module.exports = {
    gtUniqueId:gtUniqueId,
    isFileReNamed:isFileReNamed
}