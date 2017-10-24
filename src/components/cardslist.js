'use strict';
import React from 'react';
import Cards from './cards';
import {connect} from 'react-redux';
import * as actions from '../actions/cardslist';
import CreateItems from './create-items';
import {Immutable} from 'seamless-immutable';

//function to render multiple lists of cards
export class Cardslist extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateCardslist: false,
      editCardslist: {},
      cardslist: {},
      cardslistTitle: ''
    }
  }
  //keep track of text
  onAddInputChanged(event) {
    //if the addCardslist input is being used
    if (event.target.name == 'addCardslist') {
      this.setState({cardslistTitle: event.target.value});
      //otherwise assume we are editing cardslist name
    } else {
      //get cardslist from state
      var temp = this.state.cardslist;
      //update the title for the selected cardslist
      var temp2 = Immutable.update(temp, event.target.id, function() {
        return {title: event.target.value};
      });
      //store the updated cardslist title
      this.setState({cardslist: temp2});
    }
  }
  //function to add a new cardslist
  addCardslist() {
    // this.props.dispatch(
    // //dispatch query boards
    // actions.createCardslist({
    //   title: this.state.cardslistTitle,
    //   boardId: this.props.params.boardId.replace(':', '')
    // }));
    //hide the following input
    this.setState({showCreateCardslist: false});
  }
  //function to delete a cardslist
  // deleteCardslist(cardslistId) {
  //   this.props.dispatch(
  //   //dispatch query cardslist
  //   actions.deleteCardslist(cardslistId));
  // }
  //function to edit the name of the cardslist
  updateCardslist(cardslistId, cardslistName) {
    this.props.dispatch(actions.updateCardslist(cardslistId, {
      title: cardslistName,
      boardId: this.props.params.boardId.replace(':', '')
    }));
    this.forceUpdate();
  }
  //set the variable to show the create cardslist inputs
  showCreateCardslist() {
    this.setState({showCreateCardslist: true});
  }
  //deal with the user hitting enter from the input and updating the cardslist
  handleKeyPress(events) {
    if (events.charCode == 13) {
      var temp = this.state.editCardslist;
      temp[events.target.id] = true;
      this.setState({editCardslist: temp});
      this.updateCardslist(events.target.id, events.target.value);
    }
  }
  //set variable to enable the editing of the cardslist name
  editCardslistName(item) {
    var temp = this.state.editCardslist;
    temp[item] = false;
    this.setState({editCardslist: temp});
  }
  render() {
    if (this.props.cardslist) {
      var boardName = this.props.params.boardName.replace(':', '');
      var boardId = this.props.params.boardId.replace(':', '');
      //iterate over props.boards and get the item that matches the boardid
      var board = this.props.boards[Object.keys(this.props.boards).find(item => {
          //if the id of props.boards matches boardid
        return this.props.boards[item]._id == boardId;
      })];
      //function to render multiple cardslist
      var cardslist = Object.keys(this.props.cardslist).map((item, index) => {
        if (board.cardslist.indexOf(this.props.cardslist[item]._id) > -1) {
          var temp = this.props.cardslist[item];
          return (
            <li key={index}>
              <input type="text" id={temp._id} value={this.state.cardslist[temp._id]
                ? this.state.cardslist[temp._id].title
                : temp.title} disabled={(this.state.editCardslist[temp._id] == undefined)
                ? true
                : this.state.editCardslist[temp._id]} onChange={this.onAddInputChanged} onKeyPress={this.handleKeyPress}/>
              <Cards cardslistId={item} key={index} boardId={boardId}/>
              <input type="button" value="Delete Cardslist" onClick={() => this.props.deleteCardslist(temp._id)} name="deleteCardslist"/>
              <input type="button" value="Edit Cardslist" onClick={this.editCardslistName.bind(null, temp._id)} name="editCardslist"/>
            </li>
          );
        }
      });
    }
    return (
      <div className="board">
        <div className="board-name">
          <h1>{boardName}</h1>
        </div>
        <div className="board-list">
          <ul>
            {cardslist}
          </ul>
          <input type="button" value="Add Cards list" onClick={() => this.showCreateCardslist()} name="addCardslist"/> {this.state.showCreateCardslist
            ? <CreateItems onAddInputChanged={(evt) => this.onAddInputChanged(evt)} addItems={() => {this.addCardslist(); this.props.addCardslist();}} name="cardslistInput"/>
            : null}
        </div>
      </div>
    );
  }

};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state) => ({
  boards: state.boards,
  cardslist: state.cardslist
});
const mapDispatchToProps = (dispatch, props) => ({
  //dispatch to delete a cardslist
  deleteCardslist: (cardslistId) => {
    dispatch(actions.deleteCardslist(cardslistId));
  },
  //dispatch to add a new cardslist
  addCardslist: () => {
    actions.createCardslist({
      title: props.cardslistTitle,
      boardId: props.params.boardId.replace(':', '')
    });
  },
  //dispatch update to cardslist name if enter key is pressed
  updateCardslist: () => {
    if(events.charCode==13) {
      dispatch(actions.updateCardslist(events.target.id, {
        title: events.target.value,
        boardId: this.props.params.boardId.replace(':', '')
      }));
    }
  }
});
//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cardslist);
