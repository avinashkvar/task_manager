const express = require('express');
const { postTasks, getTasks } = require('../controllers/tasks.controllers');

const taskRouter = express.Router();

taskRouter.post('/tasks', async (req, res) => {
	const body = req.body;
	try {
		const data = await postTasks(body);
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

taskRouter.get('/tasks', async (req, res) => {
	try {
		const data = await getTasks();
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});


module.exports = taskRouter;