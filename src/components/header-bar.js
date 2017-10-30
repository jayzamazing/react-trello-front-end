import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser, setAuthToken} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import './header.css';

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
          buttons = <button onClick={() => this.logOut()}>Log out</button>;
        } else {
          buttons = <button className="btn login-btn"><Link to="/login">Log In</Link></button><button className="btn sign-up-btn"><Link to="/registration">Sign Up</Link></button>;
        }
        return (
            <header className="container-fluid header-bar">
              <nav className="row home-nav">
                <div className="nav-left">
                  <Link to="/" className="logo">
                    <img src={logo} alt="Logo"></img>
                  </Link>
                </div>
                <div className="nav-right">
                  {buttons}
                </div>
              </nav>
            </header>
        );
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});
export default connect(mapStateToProps)(HeaderBar);
