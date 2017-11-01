import React from 'react';
import {connect} from 'react-redux';
import CreateItems from './create-items';
import * as actions from '../actions/boards';
import Immutable from 'seamless-immutable';
import {Redirect} from 'react-router-dom';
//function to render multiple lists of boards
export class Boards extends React.Component {
  //set up initial data state
  constructor(props) {
    super(props);
    this.state = {
      showCreateBoard: false,
      editBoard: {},
      boards: {},
      boardTitle: ''
    }
  }
  componentDidMount() {
    if (!this.props.loggedIn) {
        return;
    }
    this.props.getBoards();
  }
  //keep track of text
  onAddInputChanged(event) {
    //if the addBoard input is being used
    if (event.target.name === 'addBoard') {
      //store title for board
      this.setState({boardTitle: event.target.value});
      //otherwise assume we are editing board name
    } else {
      //get boards from state
      var temp = this.state.boards;
      //update the title for the selected board
      var temp2 = Immutable.update(temp,
        event.target.id,
        function() {
          return {
            title: event.target.value
          };
        });
      //store the updated board title
      this.setState({boards: temp2});
    }
  }
  //hide create board when called
  addBoard() {
    this.setState({showCreateBoard: false});
  }
  //set the variable to show the create board inputs
  showCreateBoard() {
    this.setState({showCreateBoard: true});
  }
  //set variable to enable the editing of the boards name
  editBoardName(item) {
    var temp = this.state.editBoard;
    temp[item] = false;
    this.setState({editBoard: temp});
  }
  showBoard(boardId, boardName, item) {
    if (this.state.editBoard[item] === undefined) {
      var temp = this.state.editBoard;
      temp[item] = true;
      this.setState({editBoard: temp});
    }
    if (this.state.editBoard[item] === true) {
      this.props.history.push('/:' + boardId + '/:' + boardName);
    }
  }
  render() {
    // Only visible to logged in users
    if (!this.props.loggedIn) {
        return <Redirect to="/" />;
    }
    console.log(this.props);
    //only execute if there is data
    if (this.props.boards) {
      var list = Object.keys(this.props.boards).map((item, index) => {
        var temp = this.props.boards[item];
        return (
          <li key={index}>
            <span onClick={() => this.showBoard(null, temp._id, temp.title, temp._id)}>
              <input type="text" id={temp._id} value={this.state.boards[temp._id] ? this.state.boards[temp._id].title : temp.title}
                disabled={(this.state.editBoard[temp._id] === undefined) ? true : this.state.editBoard[temp._id] }
                onChange={(evt) => this.onAddInputChanged(evt)}
                onKeyPress={(evt) => this.props.updateBoard(evt)} name="boardName"/>
            </span>
            <input type="button" value="Delete Board" name="deleteBoard"
              onClick={() => this.props.deleteBoard(temp._id)}/>
            <input type="button" value="Edit Board" name="editBoard"
              onClick={() => this.editBoardName(temp._id)}/>
          </li>
        );
      });
    }
    return (
      <div>
        <ul>{list}</ul>
        <input type="button" value="Add Board" onClick={() => this.showCreateBoard()} name="addBoard"/>
        {this.state.showCreateBoard ?
          <CreateItems onAddInputChanged={(evt) => this.onAddInputChanged(evt)}
            addItems={() => {this.addBoard(); this.props.addBoard();}} name="boardInput"/> : null}
      </div>
    );
  }
};
//allows subcription to redux updates and access to data stored in redux store
const mapStateToProps = (state, props) => {
  const {currentUser} = state.auth;
  return {
    boards: state.boards,
    loggedIn: currentUser !== null,
    username: currentUser ? state.auth.currentUser.username : '',
    fullName: currentUser
        ? `${currentUser.fullName}`
        : ''
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
    addBoard: () => {
      dispatch(actions.createBoards({title: props.boardTitle}));
    },
    //dispatch update to board name if enter key is press in field
    updateBoard: (evt) => {
      if(evt.charCode === 13) {
        dispatch(actions.updateBoards(evt.target.id, {title: evt.target.value}));
      }
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Boards);
