import React from 'react';
import Cards from './cards';
import {connect} from 'react-redux';
import * as actions from '../actions/cardslist';
import * as boardActions from '../actions/boards';
import * as cardActions from '../actions/cards';
import './cardslist.css';
import Modal from 'react-modal';
import {withRouter} from 'react-router-dom';
import CreateCardslistForm from './create-cardslist-form';
import UpdateCardslistForm from './update-cardslist-form';
import UpdateBoardForm from './update-board-form';

//function to render multiple lists of cards
export class Cardslist extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      optionsModalOpen: false,
      showCreateCardslist: false,
      editCardslist: {},
      cardslist: {},
      cardslistTitle: '',
      boardsModalIsOpen: false
    }
    this.createCardslistSubmit = this.createCardslistSubmit.bind(this);
    this.updateBoardSubmit = this.updateBoardSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.hideCreateCardslist = this.hideCreateCardslist.bind(this);
  }
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
  createCardslistSubmit(cardslistTitle, boardId, board) {
    this.props.createCardslist(cardslistTitle, boardId, board);
    this.hideCreateCardslist();
  }
  updateBoardSubmit(boardId, boardTitle) {
    this.props.updateBoard(boardId, boardTitle);
    this.closeModal();
  }

  render() {
    if (this.props.cardslist) {
      var boardName = this.props.match.params.board.replace(':', '');
      var boardId = this.props.match.params.boardId.replace(':', '');
      //iterate over props.boards and get the item that matches the boardid
      var board = this.props.boards[Object.keys(this.props.boards).find(item => {
          //if the id of props.boards matches boardid
        return this.props.boards[item]._id === boardId;
      })];
      const cardslistItems = this.props.cardslist;
      //function to render multiple cardslist
      var cardslist = Object.keys(cardslistItems).map((item, index) => {
        let cardslistHtml;
        if (board.cardslist && board.cardslist.indexOf(item) > -1) {
          let cardslistItem = cardslistItems[item];
          cardslistHtml =  (
            <li key={index}>
              <div className="cardslist-tile">
                <div className="update-cardslist">
                  <UpdateCardslistForm boardId={boardId} board={board} index={index} _id={cardslistItem._id}/>
                  <div>
                    <span onClick={() => this.props.deleteCardslist(cardslistItem._id, boardId, board)} className="glyphicon glyphicon-minus cardslist-delete">
                    </span>
                  </div>
                </div>
                <div className="">
                  <Cards cardslistId={item} key={index} boardId={boardId}/>
                </div>
              </div>
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
          <ul className="cardslist-list-ul">
            {cardslist}
            <div className="create-cardslist">
              {this.state.showCreateCardslist
              ? null
              : <span onClick={() => this.showCreateCardslist()}
                name="createCardslist" id="createCardslist" className="createCardslist">
                  Add a list...
                </span>}
                {this.state.showCreateCardslist
                ? <CreateCardslistForm onSubmit={this.createCardslistSubmit}
                boardId={boardId} board={board} close={this.hideCreateCardslist}/>
                : null}
            </div>
          </ul>
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
        <UpdateBoardForm
          onSubmit={this.updateBoardSubmit} boardId={boardId} boardName={boardName} closeModal={this.closeModal}/>
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
  deleteCardslist: (cardslistId, boardId, board) => {
    dispatch(actions.deleteCardslist(cardslistId))
    .then(() => {
      let mutableBoard = [];
      if (board.cardslist) {
        mutableBoard = board.cardslist.asMutable();
      }
      mutableBoard.splice(mutableBoard.indexOf(cardslistId), 1);
      dispatch(boardActions.updateBoardSuccess(boardId, mutableBoard));
    });
  },
  //dispatch to add a new cardslist
  createCardslist: (cardslistTitle, boardId, board) => {
    dispatch(actions.createCardslist({
      title: cardslistTitle,
      boardId: boardId
    }))
    .then(res => {
      const keys = Object.keys(res.cardslist);
      let mutableBoard = [];
      if (board.cardslist) {
        mutableBoard = board.cardslist.asMutable();
      }
      mutableBoard.push(keys[0]);
      dispatch(boardActions.updateBoardSuccess(boardId, {_id: boardId, cardslist: mutableBoard}));
    });
  },
  //dispatch update to cardslist name if enter key is pressed
  updateCardslist: (cardslistId, cardslistTitle, boardId, board) => {
    dispatch(actions.updateCardslist(cardslistId, {
      title: cardslistTitle
    }))
    .then((res) => {
      const keys = Object.keys(res.cardslist);
      let mutableBoard = [];
      if (board.cardslist) {
        mutableBoard = board.cardslist.asMutable();
      }
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
  },
  //dispatch to delete a card
  deleteCards: (cardsId, cardslistId, cardslist) => {
    dispatch(cardActions.deleteCards(cardsId))
    .then(() => {
      let mutableCardslist = [];
      if (cardslist.cardslist) {
        mutableCardslist = cardslist.cards.asMutable();
      }
      mutableCardslist.splice(mutableCardslist.indexOf(cardsId), 1);
      dispatch(actions.updateCardslistSuccess(cardslistId, mutableCardslist));
    });
  }
});
//connects component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cardslist));
