const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
	{
		title: String,
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	},
	{
		timestamps: true,
	},
);

const TaskModel = mongoose.model('tasks', TaskSchema);

module.exports = { TaskModel };
