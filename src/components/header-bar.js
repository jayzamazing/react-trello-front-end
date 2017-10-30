import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header.css';
import logo from '../img/trello-logo-white.svg';
import {Link} from 'react-router-dom';

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(setCurrentUser(null));
        this.props.dispatch(setAuthToken(null));
        clearAuthToken();
    }
    render() {
        // Only render the log out button if we are logged in
        let buttons;
        if (this.props.loggedIn) {
          buttons = (
            <div className="nav-right">
              <button onClick={() => this.logOut()}>Log out</button>
            </div>
          );
        } else {
          buttons = (
            <div className="nav-right">
              <Link to="/login">
                <button className="btn login-btn">Log In</button>
              </Link>
              <Link to="/register">
              <button className="btn sign-up-btn">Sign Up</button>
              </Link>
            </div>
          );
        }
        return (
            <header className="container-fluid header-bar">
              <nav className="row home-nav">
                <div className="nav-left">
                  <Link to="/" className="logo">
                    <img src={logo} alt="Logo"></img>
                  </Link>
                </div>
                  {buttons}
              </nav>
            </header>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(HeaderBar);
