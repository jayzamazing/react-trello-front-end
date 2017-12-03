import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/boards';
import './boards.css';
import {Link, withRouter} from 'react-router-dom';
import CreateBoardModal from './create-board-modal';

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
  //hide create board when called
  addBoard() {
    this.setState({showCreateBoard: false});
  }
  showCreateModal() {
    this.setState({boardsModalIsOpen: true});
  }
  closeModal() {
    this.setState({boardsModalIsOpen: false});
  }
  createBoardModalSubmit(boardTitle) {
    this.props.addBoard(boardTitle);
  }
  render() {
    //only execute if there is data
    if (this.props.boards) {
      var list = Object.keys(this.props.boards).map((item, index) => {
        var temp = this.props.boards[item];
        return (<li key={index} className="boards-list">
          <Link to={'/:' + temp._id + '/:' + temp.title}>
            <div className="board-tile">
              <span className="">{
                  this.state.boards[temp._id]
                    ? this.state.boards[temp._id].title
                    : temp.title
                }</span>
            </div>
          </Link>
          <span onClick={() => this.props.deleteBoard(temp._id)} className="glyphicon glyphicon-minus boards-delete" name="deleteBoard"></span>
        </li>);
      });
    }
    return (<div className="boards-form">
      <ul>
        {list}
        <li className="boards-list" onClick={() => this.showCreateModal()} name="createBoard">
          <span className="board-tile board-create">
            Create new board...
          </span>
        </li>
      </ul>
      <CreateBoardModal isOpen={this.state.boardsModalIsOpen}
        onSubmit={this.createBoardModalSubmit}
        closeModal={this.closeModal} />
    </div>);
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
