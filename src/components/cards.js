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
    if (event.target.name == 'addCards') {
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
  //function to add a new card
  addCards() {
    // this.props.dispatch(
    //   //dispatch query cards
    //   actions.queries('cards', 'POST', {text: this.state.text},
    //   'create cards', this.props.cardslistId, this.props.boardId)
    // );
    //hide the following input
    this.setState({showCreateCards: false});
  }
  //function to delete a card
  deleteCards(cardId) {
    //dispatch query cards
    // this.props.dispatch(
    //   actions.queries('cards', 'DELETE', cardId, 'delete cards')
    // );
  }
  //function to edit the text in a card
  updateCards(cardsId, cardsText) {
    // this.props.dispatch(
    //   actions.queries('cards', 'PUT', {text: cardsText}, 'update cards', cardsId)
    // );
    this.forceUpdate();
  }
  showCreateCards() {
    this.setState({showCreateCards: true});
  }
  //deal with the user hitting enter from the input and updating the cards
  handleKeyPress(events) {
    if(events.charCode == 13) {
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
    var context = this;
    var cardslist = context.props.cardslist[Object.keys(context.props.cardslist).find(item => {
        //if the id of props.cardslist matches cardslistid
      return context.props.cardslist[item]._id == context.props.cardslistId;
    })];
    //function to render multiple cards
    var cards = Object.keys(this.props.cards).map((item, index) => {
      if (cardslist.cards.indexOf(this.props.cards[item]._id) > -1) {
        var temp = context.props.cards[item];
        return (
          <li key={index}>
            <input type="text" id={temp._id} value={context.state.cards[temp._id] ? context.state.cards[temp._id].text : temp.text}
              disabled={(context.state.editCards[temp._id] == undefined) ? true : context.state.editCards[temp._id]}
              onChange={context.onAddInputChanged}
              onKeyPress={context.handleKeyPress}/>
            <input type="button" value="Delete Card"
              onClick={context.deleteCards.bind(null, temp._id)}/>
              <input type="button" value="Edit Card"
                onClick={context.editCardsText.bind(null, temp._id)}/>
          </li>
        );
      }
    });
    return (
      <div>
        <ul>
          {cards}
        </ul>
          <input type="button" value="Add Cards" onClick={this.showCreateCards}/>
          {this.state.showCreateCards ? <CreateItems
              onAddInputChanged={this.onAddInputChanged}
              addItems={this.addCards} name="addCards"/> : null}
      </div>
    );
  }
};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state) => ({
  cardslist: state.cardslist,
  cards: state.cards
});
export default connect(mapStateToProps)(Cards);
