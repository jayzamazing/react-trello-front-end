import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import CardslistForm from './cardslist-form';
import './cardslist-page.css';

export function CardslistPage(props) {
    // Only visible to logged in users
    if (!props.loggedIn) {
        return <Redirect to="/" />;
    }
    return (
        <div className="cardslist container-fluid">
          <div className="row">
            <div className="cardslist-form-area">
              <CardslistForm match={props.match}/>
            </div>
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(CardslistPage);
