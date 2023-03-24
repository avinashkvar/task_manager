const express = require('express');
const connect = require('./db/connect');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const userRouter = require('./routes/users.routes');
const taskRouter = require('./routes/tasks.routes');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_API_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.use(
	fileUpload({
		useTempFiles: true,
	}),
);
app.use(cors());
app.use(express.json())

app.use('/',userRouter)
app.use('/',taskRouter)

connect()
	.then(() => app.listen(3001, () => console.log('listening on port 3001')))
	.catch((err) => console.log(err));

module.exports = app;
