# [YOURDLE](https://www.yourdle.lol/)

![License Static Badge](https://img.shields.io/badge/license-MIT-orange)

## Description

A website application that allows users to create their _own_ game of [WORDLE](https://www.nytimes.com/games/wordle/index.html) as well as view other custom games created by other users through a private code.

_Hence, [YOURLDE](https://www.yourdle.lol/) = Your + [WORDLE](https://www.nytimes.com/games/wordle/index.html)._

### Technology used (PERN stack)

- Frontend: React, JavaScript, HTML/CSS, Axios, Animate.css
- Backend: PostgreSQL, Node.js, Express.js

### Motivation

This project was originally created as a Valentine's surprise for my girlfriend who is a Wordle enthusiast.

### In the works

- Currently improving the `/create-yourdle/<username>` screen by automatically displaying/saving entered answers instead of having to press the _Refresh_ and _Save_ buttons.
- Containerizing this application with Docker.

## Where to Play YOURDLE

Play YOURDLE live [here!](https://www.yourdle.lol/) (Full URL: https://www.yourdle.lol/)

## How to Play YOURDLE

### Home Screen

- To view a YOURDLE, enter private code under **Code** then click **View YOURDLE!**
- To create a YOURDLE, create a username under **Username** and a code under **Code**. The, click **Create YOURDLE!**
- To switch to creating versus viewing a yourdle, click on **Create Yourdle ->** or **View Yourdle ->**, respectively.

**NOTE**: Usernames/codes as well as YOURDLEs themselves are deleted at the end of the day (PST).

### Viewing a YOURDLE

- After a code is correctly submitted at the Home screen, you are brought to a new screen to play YOURDLE.
- To play, guess the hidden expression of up to 3-7 English alphabetic letters long.
- You have up to 5 attempts to guess the expression correctly.
- If you reached your maximum attempts, you can restart the game by refreshing the screen.

**NOTE**: The hidden expression does not have to be a real word.

### Creating a YOURDLE

- After a valid username and code are created at the Home screen, you are brought to a new screen to create a YOURDLE.
- To enter an answer for your game, click on the textbox that says **"Enter..."**, type an answer up to 3-7 English alphabetic letters long, then press the **Enter** key on your keyboard.
- To save the answer for final submission of the game, click on the _Save_ button (checkmark button). Once clicked, the tiles should turn green.
- To unsave an answer, click on the _Refresh_ button (refresh cycle button). Once clicked the tiles should turn to white.
- Up to 5 answers can be created for a single YOURDLE game.
  - To add answers, click the plus sign **+** button.
  - To remove answers, click the minus sign **-** button.
- To finsh creating a YOURDLE, click on the **Finish ->** button.

## License

MIT License.
