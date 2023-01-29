const client = require('../Core/Utils/client')
module.exports = {
    name: "ready",
    async execute() {
 
        console.log(`(*) Bot ${client.user.tag}.`)

    }
}
