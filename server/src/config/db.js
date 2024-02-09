const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zgo1rph.mongodb.net/${process.env.MONGO_DB_DATABASE}`)
        .then((data) => {
            console.log(`mongodb connected with server:(${data.connection.host})`)
        })
        .catch((err) => console.log(err));
}

module.exports = connectDatabase;