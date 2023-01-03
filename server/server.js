require("dotenv").config();
const express = require("express");
const db = require("./database/index.js");
const app = express();
const port = process.env.PORT; // get port number from .env file

// Listening to server on port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// CREATE a user
app.post("/api/createUser/", async (req, res) => {
    
    const username = req["body"]["username"];
    const code = req["body"]["code"];
    const user = await db.query("INSERT INTO Users (username, code) VALUES ($1, $2) RETURNING *;", [username, code]);

    return res.status(201).json({
        "status": "success",
        "data": user["rows"][0]
    });
});

// RETRIEVE a user
app.get("/api/getUser/", async (req, res) => {

    const username = req["query"]["username"];
    const code = req["query"]["code"];
    const results = await db.query("SELECT username, code FROM Users WHERE username=$1 AND code=$2", [username, code]);

    return res.status(200).json({
        "status": "success",
        "data": results["rows"]
    });
});

// CREATE answers of a given user
app.get("/api/createWordle/:username:code", (req, res) => {

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



