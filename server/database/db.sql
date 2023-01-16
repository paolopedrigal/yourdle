-- SQL command to create a database called wordle:
--  CREATE DATABASE wordle;

-- To connect to the wordle database on psql:
--   \conenct wordle  

CREATE SCHEMA IF NOT EXISTS wordle; -- Create a schema called "wordle" if it doesn't exist
SET search_path TO wordle; -- Change the current schema to "wordle" if not already set
SHOW search_path; -- Check if current schema is "wordle"

CREATE TABLE Users (
    username VARCHAR(10) NOT NULL, -- username has max characters of 10
    code VARCHAR(8) NOT NULL, -- code has max characters of 5

    link TEXT, -- url link of wordle
    time_created TIMESTAMP, -- time created of url

    -- all answers have max characters of 9
    answer1 VARCHAR(9), -- mandatory to provide at least one answer for wordle
    answer2 VARCHAR(9),
    answer3 VARCHAR(9),
    answer4 VARCHAR(9),
    answer5 VARCHAR(9),

    PRIMARY KEY(username, code) -- primary key is username AND code
);

-- INSERT INTO Users (username, code, time_created, answer1) VALUES ('admin', '0809', '2023-01-01 12:00:00', 'WILL');