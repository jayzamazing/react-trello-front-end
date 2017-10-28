import React from 'react';

export default class Main {
  render() {
    return (
      <header>
        <nav>
          /* 2 possible navs, logged in or not */
          {this.props.nav}
        </nav>
      </header>
      <main>
        /* */
        {this.props.main}
      </main>
      <footer>
        /* future item */
      </footer>
    )
  }
}
