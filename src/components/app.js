import React from 'react';
// import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from './home';
import Boards from './boards';
import Cardslist from './cardslist';
import RegistrationPage from './registration-page';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/board/:boardId" component={Cardslist} />
      </div>
    );
  };
}
//
//
