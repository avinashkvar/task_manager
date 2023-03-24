const { UserModel } = require('../db/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

function generateToken(user) {
	if (user.password) {
		delete user.password;
	}

	return jwt.sign(user, process.env.JWT_SECRET);
}

async function getAlluser() {
	const users = await UserModel.find();
	return users;
}
async function login({ email, password }) {
	const user = await UserModel.findOne({
		email: email,
		authType: 'email-password',
	});
	console.log(user);
	if (!user) {
		throw new Error('user is not found with the given email');
	}

	const match = bcryptjs.compareSync(password, user.password);

	if (!match) {
		throw new Error('given password is wrong');
	}

	//generate token;

	return generateToken(user.toJSON());
}

async function register({ name, email, password }, { photo }) {
	const existed = await UserModel.findOne({ email });

	if (existed) {
		throw new Error('user is already existed with the given email');
	}

	password = bcryptjs.hashSync(password);

	let imageUrl = await cloudinary.uploader.upload(
		photo.tempFilePath,
		(err, result) => result,
	);
    //console.log(imageUrl.url)
	let user = await UserModel.create({
		name,
		password,
		email,
        imageUrl:imageUrl.url
	});
	user = user.toJSON();

	delete user.password;

	return user;
}

module.exports = { login, register, getAlluser };
