require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/index.js");
const app = express();
const port = process.env.PORT; // get port number from .env file

// Configure body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure cors middleware
app.use(cors());

// Listening to server on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// CREATE a user
app.post("/api/create-user/", async (req, res) => {
    
    try {
        const username = req.body.username;
        const code = req.body.code;
        const createUser = await db.query("INSERT INTO Users (username, code) VALUES ($1, $2) RETURNING *;", [username, code]);
    } catch(error) {
        console.log(error);
    }

    return res.status(201).json({
        status: "success",
        data: req.body
    });
});

// RETRIEVE a code
app.get("/api/get-username/", async (req, res) => {

    const username = req.query.username;
    const code = req.query.code;
    const results = await db.query("SELECT username, code FROM Users WHERE username=$1 AND code=$2", [username, code]);

    return res.status(200).json({
        "status": "success",
        "data": results.rows
    });
});

// RETRIEVE answers of a given user
// app.get("/api/get-answers/", async (req, res) => {
//     return res.sta
// })

// UPDATE answers of a given user
app.put("/api/create-yourdle/:username", (req, res) => {

    const username = req["query"]["username"];
    const code = req["query"]["code"];
    const answer1 = req["query"]["answer1"];
    const answer2 = req["query"]["answer2"];
    const answer3 = req["query"]["answer3"];
    const answer4 = req["query"]["answer4"];
    const answer5 = req["query"]["answer5"];

    // const results = await db.query("INSERT INTO ")

   console.log(req["params"]);
    return res.status(201).json({
        "status": "success"
    });
});

// DELETE a user
app.delete("/api/deleteUser/", (req, res) => {

    return res.status(204).json({
        "status": "success"
    })
})



