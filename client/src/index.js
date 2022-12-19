import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from "./components/NavBar.js";
import Game from "./components/Game.js";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <NavBar />
    <Game />
  </div>

);
