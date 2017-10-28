import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter, IndexRoute} from 'react-router-dom';
import Home, {Nav} from './home';
import Boards from './boards';
import Cardslist from './cardslist';
import Main from './main';


export class App extends React.Component {
  render() {
    return (
      <Route name='app' component={Main}>
        <IndexRoute components={{nav: Nav, main: Home}} />

      </Route>
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/boards" component={Boards} />
        <Route exact path="/board/:boardId" component={Cardslist} />
      </main>

    )
  }
}
class
