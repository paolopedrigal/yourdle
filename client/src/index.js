import React from 'react';
import ReactDOM from 'react-dom/client';
import { NavBar } from "./NavBar.js";
import { Board } from "./Board.js";
import { Keyboard } from './Keyboard.js';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <NavBar />
    <Board />
    <Keyboard />
  </div>

);
