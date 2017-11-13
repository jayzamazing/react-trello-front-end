import React from 'react';
import {connect} from 'react-redux';
// import CreateItems from './create-items';
import CreateBoardForm from './create-board-form';
import * as actions from '../actions/boards';
import Immutable from 'seamless-immutable';
import './boards-form.css'
import {Link, withRouter} from 'react-router-dom';
import Modal from 'react-modal';
import Input from './input';
import {Field, reduxForm, focus} from 'redux-form';
import {required, nonEmpty, length, isTrimmed} from '../validators';

//function to render multiple lists of boards
export class Boards extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateBoard: false,
      editBoard: {},
      boards: {},
      boardTitle: '',
      boardsModalIsOpen: false
    }
    this.createBoardModalSubmit = this.createBoardModalSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    //don't load if not logged in
    if (!this.props.loggedIn) {
        return;
    }
    this.props.getBoards();
  }
  //keep track of text
  // onAddInputChanged(event) {
  //   //if the addBoard input is being used
  //   if (event.target.name === 'addBoard') {
  //     //store title for board
  //     this.setState({boardTitle: event.target.value});
  //     //otherwise assume we are editing board name
  //   } else {
  //     //get boards from state
  //     var temp = this.state.boards;
  //     //update the title for the selected board
  //     var temp2 = Immutable.update(temp,
  //       event.target.id,
  //       function() {
  //         return {
  //           title: event.target.value
  //         };
  //       });
  //     //store the updated board title
  //     this.setState({boards: temp2});
  //   }
  // }
  //hide create board when called
  addBoard() {
    this.setState({showCreateBoard: false});
  }
  //set the variable to show the create board inputs
  // showCreateBoard() {
  //   this.setState({showCreateBoard: true});
  // }
  //set variable to enable the editing of the boards name
  // editBoardName(item) {
  //   var temp = this.state.editBoard;
  //   temp[item] = false;
  //   this.setState({editBoard: temp});
  // }
  showCreateModal() {
    this.setState({boardsModalIsOpen: true});
  }
  closeModal() {
    this.setState({boardsModalIsOpen: false});
  }
  createBoardModalSubmit(boardTitle) {
    this.props.addBoard(boardTitle);
    this.closeModal();
  }
  // showBoard(boardId, boardName, item) {
  //   if (this.state.editBoard[item] === undefined) {
  //     var temp = this.state.editBoard;
  //     temp[item] = true;
  //     this.setState({editBoard: temp});
  //   }
  //   if (this.state.editBoard[item] === true) {
  //     this.props.history.push('/:' + boardId + '/:' + boardName);
  //   }
  // }
  render() {
    //only execute if there is data
    if (this.props.boards) {
      var list = Object.keys(this.props.boards).map((item, index) => {
        var temp = this.props.boards[item];
        return (
          <li key={index} className="boards-list">

              {/*<span onClick={() => this.showBoard(null, temp._id, temp.title, temp._id)}>*/}
              {/*<a href={'/:' + temp._id + '/:' + temp.title}>*/}
              <Link to={'/:' + temp._id + '/:' + temp.title}>
                <div className="board-tile">
                  <span className="">{this.state.boards[temp._id] ? this.state.boards[temp._id].title : temp.title}</span>
                {/*<input type="text" id={temp._id} value={this.state.boards[temp._id] ? this.state.boards[temp._id].title : temp.title}
                  disabled={(this.state.editBoard[temp._id] === undefined) ? true : this.state.editBoard[temp._id] }
                  TODO onChange={(evt) => this.onAddInputChanged(evt)}
                  onKeyPress={(evt) => this.props.updateBoard(evt)} name="boardName"/>*/}
                </div>
              </Link>
              <span onClick={() => this.props.deleteBoard(temp._id)} className="glyphicon glyphicon-minus boards-delete">
              </span>
          </li>
        );
      });
    }
    return (
      <div className="boards-form">
        <ul>
          {list}
          <li onClick={() => this.showCreateModal()}>
            <span className="board-tile">
              Create new board...
            </span>
          </li>
        </ul>
        <CreateBoardForm isOpen={this.state.boardsModalIsOpen} closeModal={this.closeModal}
          onSubmit={this.createBoardModalSubmit} closeModal={this.closeModal}/>
        {/*<input type="button" value="Delete Board" name="deleteBoard"
          onClick={() => this.props.deleteBoard(temp._id)}/>
        <input type="button" value="Edit Board" name="editBoard"
          onClick={() => this.editBoardName(temp._id)}/>*/}
          {/*<input type="button" value="Create new board..." onClick={() => this.showCreateBoard()} name="addBoard"/>
          {this.state.showCreateBoard ?
            <CreateItems onAddInputChanged={(evt) => this.onAddInputChanged(evt)}
              addItems={() => {this.addBoard(); this.props.addBoard();}} name="boardInput"/> : null}*/}
      </div>
    );
  }
};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state, props) => {
  return {
    boards: state.boards,
    loggedIn: state.auth.currentUser !== null
  };
};
const mapDispatchToProps = (dispatch, props) => ({
    //get all boards
    getBoards: () => {
      dispatch(actions.getBoards())
    },
    //dispatch to delete board
    deleteBoard: (boardId) => {
      dispatch(actions.deleteBoards(boardId));
    },
    //dispatch to add board
    addBoard: (boardTitle) => {
      dispatch(actions.createBoards({title: boardTitle}))
      //after dispatch, grab the created board and redirect to it
      .then((res) => {
        const keys = Object.keys(res.boards);
        const title = res.boards[keys[0]].title;
        props.history.push("/:" + keys[0] + "/:" + title);
      });
    }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Boards));
