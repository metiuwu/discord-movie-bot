const mongoose = require('mongoose');

const moviename = mongoose.Schema({

    guildID: {
		type: String, required: true,
	},
	channelID: {
		type: Array, required: true, default: [],
	},
    movie: {
        type: String, required: true, default: "Zort",
    },
	userID: {
		type: String, required: true, default: "Zort",
	}

})

module.exports = mongoose.model('moivenames', moviename);