const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" })

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN === '*' ? true : process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Pawan Tiwari");
})

module.exports = app;