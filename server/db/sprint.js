const mongoose = require('mongoose');

const SprintSchema = mongoose.Schema(
	{
		tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
	},
	{
		timestamps: true,
	},
);

const SprintModel = mongoose.model('sprints',SprintSchema)

module.exports = SprintModel