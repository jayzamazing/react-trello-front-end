import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './login-form';
import './login-page.css';

export function LoginPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/boards" />;
    }

    return (
        <div className="home container">
            <div className="row">
              <div className="col-centered login-area">
                <h2>Log in to Trello</h2>
                <LoginForm />
                <p>Don't have an account? <Link to="/register">Create a Trello Account.</Link></p>
              </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
