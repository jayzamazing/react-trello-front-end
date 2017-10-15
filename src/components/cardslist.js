'use strict';
import React from 'react';
import {Cards} from '../cards';
import {connect} from 'react-redux';
import * as actions from './CardsListActions';
import CreateItems from '../utils/create-items';
import {Immutable} from 'seamless-immutable';

// var Cards = require('../cards');
// var connect = require('react-redux').connect;
// var actions = require('./CardsListActions');
// var CreateItems = require('./create-items');
// var Immutable = require('seamless-immutable');
//function to render multiple lists of cards
var Cardslist = React.createClass({
  //set up initial data state
  getInitialState: function() {
    return {showCreateCardsList: false, editCardsList: {}, cardslist: {}, cardslistTitle: ''};
  },
  //keep track of text
  onAddInputChanged: function(event) {
    //if the addCardsList input is being used
    if (event.target.name == 'addCardsList') {
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
  },
  //function to add a new board
  addCardsList: function() {
    this.props.dispatch(
    //dispatch query boards
    actions.createCardslist({
      title: this.state.cardslistTitle,
      boardId: this.props.params.boardId.replace(':', '')
    }));
    //hide the following input
    this.setState({showCreateCardsList: false});
  },
  //function to delete a cardslist
  deleteCardsList: function(cardslistId) {
    this.props.dispatch(
    //dispatch query cardslist
    actions.deleteCardslist(cardslistId));
  },
  //function to edit the name of the cardslist
  updateCardsList: function(cardslistId, cardslistName) {
    this.props.dispatch(actions.updateCardslist(cardslistId, {
      title: cardslistName,
      boardId: this.props.params.boardId.replace(':', '')
    }));
    this.forceUpdate();
  },
  //set the variable to show the create cardslist inputs
  showCreateCardsList: function() {
    this.setState({showCreateCardsList: true});
  },
  //deal with the user hitting enter from the input and updating the cardslist
  handleKeyPress: function(events) {
    if (events.charCode == 13) {
      var temp = this.state.editCardsList;
      temp[events.target.id] = true;
      this.setState({editCardsList: temp});
      this.updateCardsList(events.target.id, events.target.value);
    }
  },
  //set variable to enable the editing of the cardslist name
  editCardsListName: function(item) {
    var temp = this.state.editCardsList;
    temp[item] = false;
    this.setState({editCardsList: temp});
  },
  render: function() {
    var context = this;
    if (this.props.cardslist) {
      var boardName = context.props.params.boardName.replace(':', '');
      var boardId = context.props.params.boardId.replace(':', '');
      //iterate over props.boards and get the item that matches the boardid
      var board = context.props.boards[Object.keys(context.props.boards).find(item => {
          //if the id of props.boards matches boardid
        return context.props.boards[item]._id == boardId;
      })];
      //function to render multiple cardslist
      var cardslist = Object.keys(context.props.cardslist).map((item, index) => {
        if (board.cardslist.indexOf(context.props.cardslist[item]._id) > -1) {
          var temp = context.props.cardslist[item];
          return (
            <li key={index}>
              <input type="text" id={temp._id} value={context.state.cardslist[temp._id]
                ? context.state.cardslist[temp._id].title
                : temp.title} disabled={(context.state.editCardsList[temp._id] == undefined)
                ? true
                : context.state.editCardsList[temp._id]} onChange={context.onAddInputChanged} onKeyPress={context.handleKeyPress}/>
              <Cards.Container cardslistId={item} key={index} boardId={boardId}/>
              <input type="button" value="Delete Cardslist" onClick={context.deleteCardsList.bind(null, temp._id)}/>
              <input type="button" value="Edit Cardslist" onClick={context.editCardsListName.bind(null, temp._id)}/>
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
          <input type="button" value="Add Cards List" onClick={this.showCreateCardsList}/> {this.state.showCreateCardsList
            ? <CreateItems onAddInputChanged={this.onAddInputChanged} addItems={this.addCardsList} name="addCardsList"/>
            : null}
        </div>
      </div>
    );
  }

});
//allows subcription to redux updates and access to data stored in redux store
var mapStateToProps = function(state) {
  return {boards: state.boards, cardslist: state.cardslist};
};
//connects component to redux store
var Container = connect(mapStateToProps)(Cardslist);
module.exports = {
  Container,
  Cardslist
};
