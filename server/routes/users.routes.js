const express = require('express');
const jwt = require('jsonwebtoken');
const {
	register,
	login,
	getAlluser,
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
				return res.status(400).json('invalid token provided');
			}
		} catch (error) {
			return res.status(400).json(error);
		}
	} else {
		return res.status(400).json('no token provided');
	}
});

userRouter.post('/login', async (req, res) => {
	const body = req.body;
	try {
		const token = await login(body);
		return res.send({ data: token });
	} catch (error) {
		return res.status(404).json(error.message);
	}
});

userRouter.post('/register', async (req, res) => {
	const body = req.body;
    const file = req.files
	try {
		const user = await register(body,file);
		return res.send(user);
	} catch (error) {
		return res.status(404).json(error.message);
	}
});

userRouter.get('/users', async (req, res) => {
	try {
		const users = await getAlluser();
		return res.send(users);
	} catch (error) {
		return res.status(400).json(error);
	}
});

module.exports = userRouter