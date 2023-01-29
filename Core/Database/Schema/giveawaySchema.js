const mongoose = require('mongoose');

const favmovie = mongoose.Schema({

    guildID: {
		type: String, required: true,
	},
	messageID: {
		type: String, required: true,
	},
	userID: {
		type: String, required: true,
	},
	film: {
		type: String, required: true,
	},

})

module.exports = mongoose.model('favoritefilm', favmovie);