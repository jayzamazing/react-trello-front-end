import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './home.css';

class HomePage extends React.Component {
  componentWillMount() {
    document.body.style.backgroundColor = "#026aa7";
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }
  render() {
    // If we are logged in redirect straight to the user's dashboard
    if (this.props.loggedIn) {
        return <Redirect to="/boards" />;
    }
    return (
      <section>
        <main className="home container">
          <div className="row wrapper">
            <div className="text-center">
              <h1>Welcome to Trello!</h1>
            </div>
            <div className="text-center wrapper-2">
              <h3>This is a simple project that emulates some of trello's functionality.</h3>
              <div className="wrapper-2">
                <Link to="/register">
                  <button className="btn sign-up-btn">
                    <h4>Sign Up - It's Free.</h4>
                    </button>
                </Link>
              </div>
              <div className="wrapper">
                <p>Already use Trello? <Link to="/login" className="a-login">Log in.</Link></p>
              </div>
            </div>
          </div>
        </main>
      </section>
    );
  }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HomePage);
