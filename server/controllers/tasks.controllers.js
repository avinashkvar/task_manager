const SprintModel = require('../db/sprint');
const { TaskModel } = require('../db/tasks');

async function getTasks() {
	let tasks = await TaskModel.find().populate('userId');
	return tasks;
}

async function postTasks(body, id) {
	let task = await TaskModel.create({...body,status:'progress'});
	let tasks = await SprintModel.findById(id)
	tasks = tasks.tasks;
	tasks.push(task._id);
	await SprintModel.findByIdAndUpdate({ _id: id }, { tasks });
	return task;
}

module.exports = { getTasks, postTasks };
