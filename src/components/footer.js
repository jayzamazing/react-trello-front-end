import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';

export default class FooterBar extends React.Component {
  //only show when at the root page
  hideFooter() {
    const root = this.props.location.pathname === '/' ? true : false;
    if (root) {
      return 'container footer-bar'
    } else {
      return 'invisible';
    }
  }
  render() {
    return(
      <footer className={this.hideFooter()}>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <ul className="social social-bottom">
                  <li><Link to="https://twitter.com/jayzamazing" target="_Blank"><i className="fa fa-twitter fa-3x" aria-hidden="true"></i></Link></li>
                  <li><Link to="https://github.com/jayzamazing" target="_Blank"><i className="fa fa-github fa-3x" aria-hidden="true"></i></Link></li>
                  <li><Link to="https://www.linkedin.com/pub/adrian-lopez/99/341/688" target="_Blank"><i className="fa fa-linkedin fa-3x" aria-hidden="true"></i></Link></li>
                  <li><Link to="https://plus.google.com/108258618753081021419" target="_Blank"><i className="fa fa-google-plus fa-3x" aria-hidden="true"></i></Link></li>
              </ul>
              <p>
                <span className="copyright">&#169; Adrian J Lopez</span>
              </p>
            </div>
      </footer>
    );
  }
}
