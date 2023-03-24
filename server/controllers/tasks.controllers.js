const { TaskModel } = require('../db/tasks');

async function getTasks() {
	let tasks = await TaskModel.find().populate('userId');
	return tasks;
}

async function postTasks(body) {
	let task = await TaskModel.create(body);
	return task;
}

module.exports = { getTasks, postTasks };
