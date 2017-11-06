import React from 'react';
import CardsForm from './cards-form';
import {connect} from 'react-redux';
import * as actions from '../actions/cardslist';
import {updateBoardSuccess} from '../actions/boards';
import CreateItems from './create-items';
import {Immutable} from 'seamless-immutable';
import './cardslist-form.css';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../validators';

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
  // onAddInputChanged(event) {
  //   //if the addCardslist input is being used
  //   if (event.target.name === 'addCardslist') {
  //     this.setState({cardslistTitle: event.target.value});
  //     //otherwise assume we are editing cardslist name
  //   } else {
  //     //get cardslist from state
  //     var temp = this.state.cardslist;
  //     //update the title for the selected cardslist
  //     var temp2 = Immutable.update(temp, event.target.id, function() {
  //       return {title: event.target.value};
  //     });
  //     //store the updated cardslist title
  //     this.setState({cardslist: temp2});
  //   }
  // }
  //hide the following input
  addCardslist() {
    this.setState({showCreateCardslist: false});
  }
  //set the variable to show the create cardslist inputs
  showCreateCardslist() {
    this.setState({showCreateCardslist: true});
  }
  //deal with the user hitting enter from the input and updating the cardslist
  // handleKeyPress(events) {
  //   if (events.charCode === 13) {
  //     var temp = this.state.editCardslist;
  //     temp[events.target.id] = true;
  //     this.setState({editCardslist: temp});
  //   }
  // }
  //set variable to enable the editing of the cardslist name
  // editCardslistName(item) {
  //   var temp = this.state.editCardslist;
  //   temp[item] = false;
  //   this.setState({editCardslist: temp});
  // }

  render() {
    if (this.props.cardslist) {
      var boardName = this.props.match.params.board.replace(':', '');
      var boardId = this.props.match.params.boardId.replace(':', '');
      //iterate over props.boards and get the item that matches the boardid
      var board = this.props.boards[Object.keys(this.props.boards).find(item => {
          //if the id of props.boards matches boardid
        return this.props.boards[item]._id === boardId;
      })];
      //function to render multiple cardslist
      var cardslist = Object.keys(this.props.cardslist).map((item, index) => {
        let cardslistHtml;
        if (board.cardslist && board.cardslist.indexOf(this.props.cardslist[item]._id) > -1) {
          var temp = this.props.cardslist[item];
          cardslistHtml =  (
            <li key={index}>
              <div className="cardslist-tile">
                <h2>{this.state.cardslist[temp._id] ? this.state.cardslist[temp._id].title
                  : temp.title}</h2>
                <div className="">
                  <CardsForm cardslistId={item} key={index} boardId={boardId}/>
                </div>
              </div>
              {/*<input type="text" id={temp._id} value={this.state.cardslist[temp._id]
                ? this.state.cardslist[temp._id].title
                : temp.title} disabled={(this.state.editCardslist[temp._id] === undefined)
                ? true
                : this.state.editCardslist[temp._id]} onChange={() => this.onAddInputChanged}
                onKeyPress={(evt) => this.props.updateCardslist(evt)} name="cardslistName"/>*/}
              {/*<input type="button" value="Delete Cardslist" onClick={() => this.props.deleteCardslist(temp._id)} name="deleteCardslist"/>
            <input type="button" value="Edit Cardslist" onClick={() => this.editCardslistName(temp._id)} name="editCardslist"/>*/}
            </li>
          );
        }
        return cardslistHtml;
      });
    }
    return (
      <div className="board">
        <div className="board-name">
          <h1>{boardName}</h1>
        </div>
        <div className="cardslist-list">
          <ul>
            {cardslist}
            <div className="create-cardslist">
              {this.state.showCreateCardslist
              ? null
              : <span value="Add Cards list" onClick={() => this.showCreateCardslist()}
                name="addCardslist" id="addCardslist" className="addCardslist">
                  Add a list...
                </span>}
                {this.state.showCreateCardslist
                ? <form className="create-cardslist-area"
                  onSubmit={
                    this.props.handleSubmit(values => {
                    this.props.addCardslist(values.cardslistTitle, boardId, board);
                    this.addCardslist();
                  })}>
                    <Field
                      component={Input}
                      type="text"
                      name="cardslistTitle"
                      validate={[required, nonEmpty, isTrimmed]}
                      placeholder="Add a list"
                      labelclass="remove"
                      inputClass="addCardslist"
                    />
                    <button className="create-cardslist-btn btn btn-success"
                      type="submit"
                      disabled={this.props.pristine || this.props.submitting}>
                      Save
                    </button>
                    <button type="button" className="btn btn-default close-cardslist-btn"
                      aria-label="close button" onClick={() => this.addCardslist()}>
                        <span className="glyphicon glyphicon-remove"
                          aria-hidden="true"></span>
                    </button>
                  </form>
                : null}

            </div>
          </ul>
          {/*
            <CreateItems onAddInputChanged={(evt) => this.onAddInputChanged(evt)} addItems={() => {this.addCardslist(); this.props.addCardslist();}} name="cardslistInput"/>
            inputClass={}
            labelclass={}
            */}
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
  addCardslist: (cardslistTitle, boardId, board) => {
    dispatch(actions.createCardslist({
      title: cardslistTitle,
      boardId: props.match.params.boardId.replace(':', '')
    }))
    .then((res) => {
      const keys = Object.keys(res.cardslist);
      const mutableBoard = board.cardslist.asMutable();
      mutableBoard.push(keys[0]);
      dispatch(updateBoardSuccess(boardId, {_id: boardId, cardslist: mutableBoard}));
    });
  },
  //dispatch update to cardslist name if enter key is pressed
  updateCardslist: (evt) => {
    if(evt.charCode === 13) {
      dispatch(actions.updateCardslist(evt.target.id, {
        title: evt.target.value
      }));
    }
  }
});
//connects component to redux store
Cardslist = connect(mapStateToProps, mapDispatchToProps)(Cardslist);
export default reduxForm({
  form: 'create cardslist',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration', Object.keys(errors)[0]))
})(Cardslist);
