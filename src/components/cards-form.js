import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/cards';
import * as cardslistActions from '../actions/cardslist';
// import CreateItems from './create-items';
import {Immutable} from 'seamless-immutable';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Input from './input';
import './cards-form.css';
import CreateCardsForm from './create-cards-form';
import UpdateCardsForm from './update-cards-form';
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
      var temp = this.state.cards;
      //update the title for the selected cards
      var temp2 = Immutable.update(temp,
      event.target.id,
      function() {
        return {
          title: event.target.value
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
    var temp = this.state.editCards;
    temp[item] = false;
    this.setState({editCards: temp});
  }
  createCardsSubmit(cardsTitle, cardsText, _id, cardslist) {
    this.props.createCards(cardsTitle, cardsText, _id, cardslist);
    this.hideCreateCards();
  }
  //defaultValue={this.state.cards[temp._id] ? this.state.cards[temp._id].title : temp.title}
  render() {
    var cardslist = this.props.cardslist[Object.keys(this.props.cardslist).find(item => {
        //if the id of props.cardslist matches cardslistid
      return this.props.cardslist[item]._id === this.props.cardslistId;
    })];
    //function to render multiple cards
    var cards = Object.keys(this.props.cards).map((item, index) => {
      let cardsHtml;
      if (cardslist.cards && cardslist.cards.indexOf(this.props.cards[item]._id) > -1) {
        var temp = this.props.cards[item];
        cardsHtml = (
          <li key={index}>
            <div className="cards-tile">
              <div className="update-card">
                <UpdateCardsForm index={index}
                  _id={temp._id} card={{['title-' + index]: this.state.cards[temp._id] ? this.state.cards[temp._id].title : temp.title}}
                  index={index}/>
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
  deleteCards: (cardId) => {
    dispatch(actions.deleteCards(cardId));
  },
  //dispatch update to cards name if enter key is pressed
  updateCards: (cardsId, cardsTitle, cardsText) => {
    dispatch(actions.createCards(cardsId, {
      title: cardsTitle,
      cardsText: cardsText
    }));
  }
});
//connects component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
// export default reduxForm({
//   form: 'cards',
//   onSubmitFail: (errors, dispatch) =>
//       dispatch(focus('cards-form', Object.keys(errors)[0]))
// })(Cards);
