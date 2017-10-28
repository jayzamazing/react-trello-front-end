import React from 'react';
// import {Link} from 'react-router-dom';
import logo from '../img/trello-logo-white.svg'
import './home.css';

export function Nav() {
  return (
    <nav class="home-nav">
      <a>
        <img src={logo} alt="Logo"></img>
      </a>
    </nav>
  );
}

export default function Home() {
  return (
    <section>
      <div>
        <h2>Welcome to Jays Trello.</h2>
        <p>This is a simple project that emulates a part of Trello's functionality.</p>
        <button type="button">Sign Up - It's Free.</button>
        <p>Already use Trello> <a>Log in.</a></p>
      </div>
    </section>
  );
}
