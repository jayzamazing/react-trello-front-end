import React from 'react';

//create a simple form to submit changes
export default class CreateItems extends React.Component {
  render() {
    return (
      <form className="list-form">
        <input type="text" onChange={this.props.onAddInputChanged} name={this.props.name}/>
        <input type="button" value="Submit" onClick={this.props.addItems}/>
      </form>
    );
  }
}
