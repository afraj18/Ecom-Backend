const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth")
const userRoute = require("./Routes/user")

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB Connection Succesfull")
).catch((err) => console.log(err))

app.use(express.json());
app.use('/app/auth', authRoute);



app.listen(5000, () => {
    console.log("Backend Server is running")
})