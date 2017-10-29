import React from 'react';
// import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from './home';
import Boards from './boards';
import Cardslist from './cardslist';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/board/:boardId" component={Cardslist} />
      </div>
    );
  };
}
//
//
