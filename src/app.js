const express = require("express");
const cors = require("cors");
const userRouter =require("./routes/user.route.js")
require("dotenv").config({ path: "./.env" })

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("index")
})

app.use("/api/v1/users", userRouter)

module.exports = app;