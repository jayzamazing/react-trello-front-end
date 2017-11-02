import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/cards';
import CreateItems from './create-items';
import {Immutable} from 'seamless-immutable';
//component to store list of cards and text
export class Cards extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateCards: false,
      editCards: {},
      cards: {},
      text: ''
    }
  }
  //keep track of text
  onAddInputChanged(event) {
    //if the addCards input is being used
    if (event.target.name === 'addCards') {
      this.setState({text: event.target.value});
    //otherwise assume we are editing cards name
    } else {
      //get cards from state
      var temp = this.state.cards;
      //update the title for the selected cards
      var temp2 = Immutable.update(temp,
      event.target.id,
      function() {
        return {
          text: event.target.value
        };
      });
      //store the updated cards
      this.setState({cardslist: temp2});
    }
  }
   //hide the following input
  addCards() {
    this.setState({showCreateCards: false});
  }
  showCreateCards() {
    this.setState({showCreateCards: true});
  }
  //deal with the user hitting enter from the input and updating the cards
  handleKeyPress(events) {
    if(events.charCode === 13) {
      var temp = this.state.editCards;
      temp[events.target.id] = true;
      this.setState({editCards: temp});
      this.updateCards(events.target.id, events.target.value);
    }
  }
  //set variable to enable the editing of the cards text
  editCardsText(item) {
    var temp = this.state.editCards;
    temp[item] = false;
    this.setState({editCards: temp});
  }
  render() {
    var cardslist = this.props.cardslist[Object.keys(this.props.cardslist).find(item => {
        //if the id of props.cardslist matches cardslistid
      return this.props.cardslist[item]._id === this.props.cardslistId;
    })];
    //function to render multiple cards
    var cards = Object.keys(this.props.cards).map((item, index) => {
      let cardsHtml;
      if (cardslist.cards.indexOf(this.props.cards[item]._id) > -1) {
        var temp = this.props.cards[item];
        cardsHtml = (
          <li key={index}>
            <span>
              {this.state.cards[temp._id] ? this.state.cards[temp._id].text : temp.text}
            </span>
            {/*<input type="text" id={temp._id} value={this.state.cards[temp._id] ? this.state.cards[temp._id].text : temp.text}
              disabled={(this.state.editCards[temp._id] === undefined) ? true : this.state.editCards[temp._id]}
              onChange={() => this.onAddInputChanged}
              onKeyPress={(evt) => this.props.updateCards(evt)} name="cardsName"/>*/}
            {/*<input type="button" value="Delete Card"
              onClick={() => this.props.deleteCards(temp._id)} name="deleteCards"/>
              <input type="button" value="Edit Card"
                onClick={() => this.editCardsText(temp._id)} name="editCards"/>*/}
          </li>
        );
      }
      return cardsHtml;
    });
    return (
      <div>
        <ul>
          {cards}
        </ul>
          {/*<input type="button" value="Add Cards" onClick={() => this.showCreateCards} name="addCards"/>
          {this.state.showCreateCards ? <CreateItems
              onAddInputChanged={this.onAddInputChanged}
              addItems={this.addCards} name="addCards"/> : null}*/}
      </div>
    );
  }
};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state) => ({
  cardslist: state.cardslist,
  cards: state.cards
});
const mapDispatchToProps = (dispatch, props) => ({
  //dispatch to delete a cards
  deleteCards: (cardId) => {
    dispatch(actions.deleteCards(cardId));
  },
  //dispatch to add a new cards
  addCardslist: () => {
    dispatch(actions.createCards({text: this.state.text, cardslistId: props.cardslistId}))
  },
  //dispatch update to cards name if enter key is pressed
  updateCards: (evt) => {
    if(evt.charCode === 13) {
      dispatch(actions.updateCards(evt.target.id, {text: evt.target.value}));
    }
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
