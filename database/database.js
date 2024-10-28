const mongoose  = require("mongoose");

async function server(){
    await mongoose.connect("mongodb://127.0.0.1:27017/WPGROUP")
}

module.exports = server;
server();