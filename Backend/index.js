const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();  // Fixed the typo here

/*app.get("/home", (req, res) => {
    res.send("Welcome to the Express API!");
});*/


// Route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// Activate
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);  // Fixed the typo here
});
