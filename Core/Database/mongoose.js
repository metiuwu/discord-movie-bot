const mongoose = require('mongoose');
const config = require('../Settings/config');
mongoose.set('strictQuery', true)
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('(*) Mongoose bağlantısı kuruldu.')
}).catch((err) => {
    console.log(err)
});