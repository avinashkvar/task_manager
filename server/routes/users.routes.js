const express = require('express');
const jwt = require('jsonwebtoken');
const {
	register,
	login,
	getAlluser,
	getSingleUser,
} = require('../controllers/user.controllers');
const userRouter = express.Router();

userRouter.get('/loginUser', (req, res) => {
	const authorization = req.headers.authorization;

	if (authorization) {
		let token = authorization.split(' ').pop();
		try {
			if (token) {
				jwt.verify(token, process.env.JWT_SECRET);

				const user = jwt.decode(token);
				return res.send(user);
			} else {
				return res.status(200).json('invalid token provided');
			}
		} catch (error) {
			return res.status(200).json(error);
		}
	} else {
		return res.status(200).json('no token provided');
	}
});

userRouter.post('/login', async (req, res) => {
	const body = req.body;
	try {
		const token = await login(body);
		return res.send({ data: token });
	} catch (error) {
		return res.status(200).json(error.message);
	}
});

userRouter.post('/register', async (req, res) => {
	const body = req.body;
	const file = req.files;
	console.log(file, body);
	try {
		const user = await register(body, file);
		return res.send(user);
	} catch (error) {
		return res.status(200).json(error.message);
	}
});

userRouter.get('/users', async (req, res) => {
	try {
		const users = await getAlluser();
		return res.send(users);
	} catch (error) {
		return res.status(200).json(error);
	}
});

userRouter.get('/user/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await getSingleUser(id);
		return res.status(200).send(user);
	} catch (error) {
		return res.status(200).json(error.message);
	}
});

module.exports = userRouter;
