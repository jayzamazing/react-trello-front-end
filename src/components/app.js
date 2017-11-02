import React from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';
import Home from './home';
import BoardsPage from './boards-page';
import Cardslist from './cardslist';
import RegistrationPage from './registration-page';
import Login from './login-page';
import HeaderBar from './header-bar';
import {refreshAuthToken} from '../actions/auth';

export class App extends React.Component {
  componentDidMount() {
    if (this.props.hasAuthToken) {
        // Try to get a fresh auth token if we had an existing one in
        // localStorage
        this.props.dispatch(refreshAuthToken());
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 // One hour
    );
  }

  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }
    clearInterval(this.refreshInterval);
  }
  render() {
    return (
      <div>
        <HeaderBar location={this.props.location} />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/boards" component={BoardsPage} />
        <Route exact path="/:boardId/:board" component={Cardslist} />
      </div>
    );
  };
}
//
const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});
export default withRouter(connect(mapStateToProps)(App));
