const express = require('express');
const {
	postSprint,
	getSprints,
} = require('../controllers/sprints.controllers');
const sprintsRouter = express.Router();

sprintsRouter.post('/sprints', async (req, res) => {
	const body = req.body;
	try {
		const data = await postSprint();
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

sprintsRouter.get('/sprints', async (req, res) => {
	try {
		const data = await getSprints();
		return res.status(200).send(data);
	} catch (error) {
		return res.status(400).json(error.message);
	}
});

module.exports = sprintsRouter;
