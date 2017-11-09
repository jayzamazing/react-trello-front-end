import React from 'react';
import CardsForm from './cards-form';
import {connect} from 'react-redux';
import * as actions from '../actions/cardslist';
import * as boardActions from '../actions/boards';
import CreateItems from './create-items';
import {Immutable} from 'seamless-immutable';
import './cardslist-form.css';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import Textarea from './textarea';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Modal from 'react-modal';
import {withRouter} from 'react-router-dom';

//function to render multiple lists of cards
export class Cardslist extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateCardslist: false,
      editCardslist: {},
      cardslist: {},
      cardslistTitle: '',
      boardsModalIsOpen: false
    }
    this.submitUpdateCardslist = this.submitUpdateCardslist.bind(this);
  }
  //keep track of text
  // onAddInputChanged(event) {
  //   //if the updateCardslist input is being used
  //   if (event.target.name === 'updateCardslist') {
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
  hideCreateCardslist() {
    this.setState({showCreateCardslist: false});
  }
  //set the variable to show the create cardslist inputs
  showCreateCardslist() {
    this.setState({showCreateCardslist: true});
  }
  //set the variable for opening the update boards title
  showUpdateBoardModal() {
    this.setState({boardsModalIsOpen: true});
  }
  //close the modal for updating the modal
  closeModal() {
    this.setState({boardsModalIsOpen: false});
  }
  /*
  * deal with enter key being pressed. if the value is different from its initial
  * value, then update it in the db and blur out the field.
  */
  submitUpdateCardslist(events, _id, boardId, board) {
    if (events.charCode === 13 && events.target.value !== events.target.defaultValue) {
      events.preventDefault();
      events.target.blur();
      this.props.updateCardslist(_id, events.target.value, boardId, board);
    }
  }
  /*
  * deal with on blur event for the updatecardslist form
  * if the textarea value has changed, then it will persist to the db
  */
  blurUpdateCardslist(events, _id, boardId, board) {
    //check that the value is different from the initial value
    if (events.target.value !== events.target.defaultValue) {
      this.props.updateCardslist(_id, events.target.value, boardId, board);
    }
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
                <div className="update-cardslist">
                  <form className="update-cardslist-area"
                    ref={'updateCardslistForm-' + index}>
                      <Field
                        component={Textarea}
                        ref={'cardslistTitle-' + index}
                        name={'cardslistTitle-' + index}
                        validate={[required, nonEmpty, isTrimmed]}
                        textareaClass="updateCardslist"
                        defaultValue={this.state.cardslist[temp._id] ? this.state.cardslist[temp._id].title
                          : temp.title}
                        onKeyPress={(e) => this.submitUpdateCardslist(e, temp._id, boardId, board)}
                        onBlur={(e) => this.blurUpdateCardslist(e, temp._id, boardId, board)}
                      />
                  </form>
                  <div>
                    <span onClick={() => this.showOptionsModal()} className="glyphicon glyphicon-option-horizontal cardslist-tile-options">
                    </span>
                  </div>
                </div>
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
      <div className="cardslist-form col-xs-12">
        <div className="cardslist-list">
          <div className="board-name">
            <span onClick={() => this.showUpdateBoardModal()}><h1>{boardName}</h1></span>
          </div>
          <ul>
            {cardslist}
            <div className="create-cardslist">
              {this.state.showCreateCardslist
              ? null
              : <span value="Add Cards list" onClick={() => this.showCreateCardslist()}
                name="createCardslist" id="createCardslist" className="createCardslist">
                  Add a list...
                </span>}
                {this.state.showCreateCardslist
                ? <form className="create-cardslist-area cardslist-tile"
                  onSubmit={
                    this.props.handleSubmit(values => {
                    this.props.createCardslist(values.cardslistTitle, boardId, board);
                    this.hideCreateCardslist();
                  })}>
                    <Field
                      component={Input}
                      type="text"
                      name="cardslistTitle"
                      validate={[required, nonEmpty, isTrimmed]}
                      placeholder="Add a list"
                      labelclass="remove"
                      inputClass="updateCardslist"
                    />
                    <button className="create-cardslist-btn btn btn-success"
                      type="submit"
                      disabled={this.props.pristine || this.props.submitting}>
                      Save
                    </button>
                    <button type="button" className="btn btn-default close-cardslist-btn"
                      aria-label="close button" onClick={() => this.hideCreateCardslist()}>
                        <span className="glyphicon glyphicon-remove"
                          aria-hidden="true"></span>
                    </button>
                  </form>
                : null}
            </div>
          </ul>
          {/*
            <CreateItems onAddInputChanged={(evt) => this.onAddInputChanged(evt)} addItems={() => {this.updateCardslist(); this.props.updateCardslist();}} name="cardslistInput"/>
            inputClass={}
            labelclass={}
            */}
        </div>
        <Modal
          isOpen={this.state.boardsModalIsOpen}
          onRequestClose={() => this.closeModal()}
          contentLabel="Update Board Modal"
          className={{
            base: 'update-board',
            afterOpen: 'update-board-after-open',
            beforeClose: 'update-board-before-close'
          }}
          overlayClassName={{
            base: 'update-board-overlay',
            afterOpen: 'update-board-overlay-after-open',
            beforeClose: 'update-board-overlay-before-close'
          }}>
          <form className="update-board-input-area"
            onSubmit={this.props.handleSubmit(values =>
            {this.props.updateBoard(boardId, values.boardTitle); this.closeModal()})}>
            <span className="center-text"><h5>Rename Board</h5></span>
              <button type="button" className="btn btn-default close-modal-btn"
                aria-label="close button" onClick={() => this.closeModal()}>
                  <span className="glyphicon glyphicon-remove"
                    aria-hidden="true"></span>
              </button>
            <hr/>

            <Field
              component={Input}
              type="text"
              name="boardTitle"
              validate={[required, nonEmpty, isTrimmed]}
              inputClass="update-board-input"
              placeholder="Update board title"
              label="Name"
              labelclass="update-label"
            />
            <button className="update-board-btn btn btn-success"
                type="submit"
                disabled={this.props.pristine || this.props.submitting}>
                Rename
            </button>
          </form>
        </Modal>
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
  createCardslist: (cardslistTitle, boardId, board) => {
    dispatch(actions.createCardslist({
      title: cardslistTitle,
      boardId: boardId
    }))
    .then((res) => {
      const keys = Object.keys(res.cardslist);
      const mutableBoard = board.cardslist.asMutable();
      mutableBoard.push(keys[0]);
      dispatch(boardActions.createBoardSuccess(boardId, {_id: boardId, cardslist: mutableBoard}));
    });
  },
  //dispatch update to cardslist name if enter key is pressed
  updateCardslist: (cardslistId, cardslistTitle, boardId, board) => {
    dispatch(actions.updateCardslist(cardslistId, {
      title: cardslistTitle
    }))
    .then((res) => {
      const keys = Object.keys(res.cardslist);
      const mutableBoard = board.cardslist.asMutable();
      mutableBoard.push(keys[0]);
      dispatch(boardActions.updateBoardSuccess(boardId, {_id: boardId, cardslist: mutableBoard}));
    });
  },
  updateBoard: (boardId, boardName) => {
    dispatch(boardActions.updateBoards(boardId, {title: boardName}))
    .then((res) => {
      const keys = Object.keys(res.boards);
      const title = res.boards[keys[0]].title;
      props.history.push("/:" + keys[0] + "/:" + title);
    });
  }
});
//connects component to redux store
Cardslist = withRouter(connect(mapStateToProps, mapDispatchToProps)(Cardslist));
export default reduxForm({
  form: 'cardslist',
  onSubmitFail: (errors, dispatch) =>
      dispatch(focus('registration', Object.keys(errors)[0]))
})(Cardslist);
