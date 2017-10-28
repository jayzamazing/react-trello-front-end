import React from 'react';

//create a simple form to submit changes
export default class CreateItems {
  render() {
    return (
      <form className="list-form">
        <input type="text" onChange={this.props.onAddInputChanged} name={this.props.name}/>
        <button type="submit" value="Submit" onClick={this.props.addItems}/>
      </form>
    );
  }
}
