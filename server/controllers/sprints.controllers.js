const SprintModel = require("../db/sprint");

async function postSprint(body){
     let sprint = await SprintModel.create(body)
     return sprint;
}

async function getSprints(){
    return await SprintModel.find().populate({
			path: 'tasks',
			populate: {
				path: 'userId',
				model: 'users',
			},
		});
}

module.exports = {postSprint,getSprints};