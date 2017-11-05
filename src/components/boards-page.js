import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import BoardsForm from './boards-form';
import './boards-page.css';

export function BoardsPage(props) {
    // Only visible to logged in users
    if (!props.loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="boards container">
          <div className="row">
            <div className="boards-area">
              <h3>Personal Boards</h3>
              <BoardsForm />
            </div>
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(BoardsPage);
