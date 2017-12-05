import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import RegistrationForm from './registration-form';
import './registration-page.css';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/boards" />;
    }
    return (
        <div className="registration container">
          <div className="row">
            <div className="col-centered form-area">
              <h2>Create a Trello Account</h2>
              <RegistrationForm />
              <p>Already have an account? <Link to="/login">Log in.</Link></p>
            </div>
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
