import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/cards';
import * as cardslistActions from '../actions/cardslist';
import {Immutable} from 'seamless-immutable';
import './cards.css';
import CreateCardsForm from './create-cards-form';
import UpdateCards from './update-cards';
//component to store list of cards and title
export class Cards extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateCards: false,
      editCards: {},
      cards: {},
      title: ''
    }
    this.hideCreateCards = this.hideCreateCards.bind(this);
    this.createCardsSubmit = this.createCardsSubmit.bind(this);
  }
  //keep track of title
  onAddInputChanged(event) {
    //if the addCards input is being used
    if (event.target.name === 'addCards') {
      this.setState({title: event.target.value});
    //otherwise assume we are editing cards name
    } else {
      //get cards from state
      var cardsItems = this.state.cards;
      //update the title for the selected cards
      var updatedCardsItems = Immutable.update(cardsItems,
      event.target.id,
      function() {
        return {
          title: event.target.value
        };
      });
      //store the updated cards
      this.setState({cardslist: updatedCardsItems});
    }
  }
   //hide the following input
  addCards() {
    this.setState({showCreateCards: false});
  }
  //hide the following input
  hideCreateCards() {
    this.setState({showCreateCards: false});
  }
  //set the variable to show the create cardslist inputs
  showCreateCards() {
    this.setState({showCreateCards: true});
  }
  //set variable to enable the editing of the cards title
  editCardstitle(item) {
    var editCards = this.state.editCards;
    editCards[item] = false;
    this.setState({editCards: editCards});
  }
  createCardsSubmit(cardsTitle, cardsText, _id, cardslist) {
    this.props.createCards(cardsTitle, cardsText, _id, cardslist);
    this.hideCreateCards();
  }

  render() {
    var cardslist = this.props.cardslist[Object.keys(this.props.cardslist).find(item => {
        //if the id of props.cardslist matches cardslistid
      return this.props.cardslist[item]._id === this.props.cardslistId;
    })];
    var cardsItems = this.props.cards;
    //function to render multiple cards
    var cards = Object.keys(cardsItems).map((item, index) => {
      let cardsHtml;
      if (cardslist.cards && cardslist.cards.indexOf(cardsItems[item]._id) > -1) {
        var cardsItem = cardsItems[item];
        cardsHtml = (
          <li key={index}>
            <div className="cards-tile">
              <div className="update-card">
                <UpdateCards index={index} deleteCards={this.props.deleteCards} updateCards={this.props.updateCards}
                  _id={cardsItem._id} cards={this.props.cards}
                  cardslistId={cardsItem.cardslistId} cardslist={this.props.cardslist}/>
              </div>
            </div>
          </li>
        );
      }
      return cardsHtml;
    });
    return (
      <div className="cards-form">
        <ul className="cards-list-ul">
          {cards}
          <li>
          <div className="create-cards">
            {this.state.showCreateCards
            ? null
            : <div className="create-cards-link">
              <span value="Add Cards" onClick={() => this.showCreateCards()}
                name="createcards" id="createcards" className="createcards">
                  Add a card...
              </span>
              </div>}
              {this.state.showCreateCards
              ? <CreateCardsForm onSubmit={this.createCardsSubmit} cardslist={cardslist} close={this.hideCreateCards}/>
              : null}
          </div>
          </li>
        </ul>
      </div>
    );
  }
};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state) => ({
  cardslist: state.cardslist,
  cards: state.cards,
  loadCards: state.loadCards
});
const mapDispatchToProps = (dispatch, props) => ({
  createCards: (cardsTitle, cardsText, cardslistId, cardslist) => {
    dispatch(actions.createCards({
      title: cardsTitle,
      cardslistId: cardslistId,
      cardsText: cardsText
    }))
    .then(res => {
      const keys = Object.keys(res.cards);
      let mutableCardslist = [];
      if (cardslist.cards) {
        mutableCardslist = cardslist.cards.asMutable();
      }
      mutableCardslist.push(keys[0]);
      dispatch(cardslistActions.updateCardslistSuccess(cardslistId, {_id: cardslistId, cards: mutableCardslist}));
    });
  },
  //dispatch to delete a cards
  deleteCards: (cardId, cardslistId, cardslist) => {
    dispatch(actions.deleteCards(cardId))
    .then(() => {
      let mutableCardslist = [];
      if (cardslist) {
        mutableCardslist = cardslist.asMutable();
        mutableCardslist.cards = mutableCardslist.cards.asMutable();
      }
      mutableCardslist.cards.splice(mutableCardslist.cards.indexOf(cardId), 1);
      dispatch(cardslistActions.updateCardslistSuccess(cardslistId, mutableCardslist));
    });
  },
  //dispatch update to cards name if enter key is pressed
  updateCards: (cardsId, body) => {
    dispatch(actions.updateCards(cardsId, body));
  }
});
//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
