const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
        console.log("DB Connection issue");
        console.error(err);
        process.exit(1);
    });
};
