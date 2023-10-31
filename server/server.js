require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database/index.js");
const cron = require("node-cron");
const app = express();
const port = process.env.PORT || 3001; // get port number from .env file

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
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
    const createUser = await db.query(
      "INSERT INTO Users (username, code) VALUES ($1, $2) RETURNING *;",
      [username, code]
    );
    res.status(201).json({
      status: "success",
      data: req.body,
    });
  } catch (error) {
    console.log(error);
  }
});

// RETRIEVE a username or code
app.get("/api/get-user/", async (req, res) => {
  try {
    const username = req.query.username;
    const code = req.query.code;
    const results = await db.query(
      "SELECT username, code FROM Users WHERE username=$1 OR code=$2;",
      [username, code]
    );
    res.status(200).json({
      status: "success",
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// Check if answers exists (by seeing if first answer is input) when given a username
app.get("/api/check-answers/", async (req, res) => {
  try {
    const username = req.query.username;
    const results = await db.query(
      "SELECT answer1 FROM Users WHERE username=$1",
      [username]
    ); // Need to only check answer1 to see if user has answers
    res.status(201).json({
      status: "success",
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// RETRIEVE answers of a given code
app.get("/api/get-answers/", async (req, res) => {
  try {
    const code = req.query.code;
    const results = await db.query(
      "SELECT answer1, answer2, answer3, answer4, answer5 FROM Users WHERE code=$1",
      [code]
    );
    res.status(201).json({
      status: "success",
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// UPDATE answers of a given user
app.put("/api/create-yourdle/", async (req, res) => {
  try {
    const username = req.body.username;
    const answer1 = req.body.answer1;
    const answer2 = req.body.answer2;
    const answer3 = req.body.answer3;
    const answer4 = req.body.answer4;
    const answer5 = req.body.answer5;
    const results = await db.query(
      "UPDATE Users " +
        "SET answer1=$1, answer2=$2, answer3=$3, answer4=$4, answer5=$5 " +
        "WHERE username=$6 " +
        "RETURNING *;",
      [answer1, answer2, answer3, answer4, answer5, username]
    );

    res.status(201).json({
      status: "success",
      data: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// DELETE all users from table that is not admin
async function deleteAllUsers() {
  const results = await db.query(
    "DELETE FROM Users WHERE username is NOT NULL AND username != 'admin';"
  );
  return results;
}

// Schedule deleteAllUsers after every midnight
cron.schedule("0 0 * * * ", () => {
  deleteAllUsers().then(() => {
    console.log("Deleted all users after midnight");
  });
});
