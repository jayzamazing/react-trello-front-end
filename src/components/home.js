import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../img/trello-logo-white.svg'
import './home.css';

export default function Home() {
  return (
    <section>
      <header className="container-fluid">
        <nav className="row home-nav">
          <div className="nav-left">
            <Link to="/" className="logo">
              <img src={logo} alt="Logo"></img>
            </Link>
          </div>
          <div className="nav-right">
            <button className="btn login-btn">
              <Link to="/login">Log In</Link>
            </button>
            <button className="btn sign-up-btn">
              <Link to="/registration">Sign Up</Link>
            </button>
          </div>

        </nav>
      </header>
      <main className="container">
        <div className="row wrapper">
          <div className="text-center">
            <h1>Welcome to Jays Trello!</h1>
          </div>
          <div className="text-center wrapper-2">
            <h3>This is a simple project that emulates some of trello's functionality.</h3>
            <div className="wrapper-2">
              <button className="btn sign-up-btn">
                <Link to="/registration"><h4>Sign Up - It's Free.</h4></Link>
              </button>
            </div>
            <div className="wrapper">
              <p>Already use Trello? <Link to="/login" className="a-login">Log in.</Link></p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
