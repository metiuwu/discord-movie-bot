const mongoose = require('mongoose');

const greetSchema = mongoose.Schema({

    guildID: {
		type: String, required: true,
	},
	channelID: {
		type: Array, required: true, default: [],
	},
    message: {
        type: String, required: true, default: "Welcome to the {server} server, {member}!",
    },
	button: {
		type: String, required: true,
	},
})

module.exports = mongoose.model('greet', greetSchema);