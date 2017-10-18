import React from 'react';
import {connect} from 'react-redux';
import { Router, hashHistory } from 'react-router';
import CreateItems from './create-items';
import * as actions from '../actions/boards';
import {Immutable} from 'seamless-immutable';
//function to render multiple lists of boards
export class Boards extends React.Component {
  //set up initial data state
  // getInitialState() {
  //   return {
  //     showCreateBoard: false,
  //     editBoard: {},
  //     boards: {},
  //     boardTitle: ''
  //   };
  // }
  constructor(props) {
    super(props);
    this.state = {
      showCreateBoard: false,
      editBoard: {},
      boards: {},
      boardTitle: ''
    }
    console.log(this);
    this.props.dispatch(actions.getBoards());
  }
  //keep track of text
  onAddInputChanged(event) {
    //if the addBoard input is being used
    if (event.target.name == 'addBoard') {
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
  //function to add a new board by dispatching post request
  addBoard() {
    this.props.dispatch(
      //dispatch to create a board
      actions.createBoards({title: this.state.boardTitle})
    );
    this.setState({showCreateBoard: false});
  }
  //function to delete a board by dispatching delete request
  deleteBoard(boardId) {
    this.props.dispatch(
      //dispatch to delete a board
      actions.deleteBoards(boardId)
    );
    this.forceUpdate();
  }
  //function to edit the name of the board
  updateBoard(boardId, boardName) {
    this.props.dispatch(
      //dispatch tp update a board
      actions.updateBoards(boardId, {title: boardName})
    );
    this.forceUpdate();
  }
  // componentDidMount() {
  //   this.props.dispatch(
  //     //dispatch to get all boards
  //     actions.getBoards()
  //   );
  // }
  //set the variable to show the create board inputs
  showCreateBoard() {
    this.setState({showCreateBoard: true});
  }
  handleKeyPress(events) {
    if(events.charCode==13){
      var temp = this.state.editBoard;
      temp[events.target.id] = true;
      this.setState({editBoard: temp});
      this.updateBoard(events.target.id, events.target.value);
    }
  }
  //set variable to enable the editing of the boards name
  editBoardName(item) {
    var temp = this.state.editBoard;
    temp[item] = false;
    this.setState({editBoard: temp});
  }
  showBoard(boardId, boardName, item) {
    if (this.state.editBoard[item] == undefined) {
      var temp = this.state.editBoard;
      temp[item] = true;
      this.setState({editBoard: temp});
    }
    if (this.state.editBoard[item] == true) {
      hashHistory.push('/:' + boardId + '/:' + boardName);
    }
  }
  render() {
    var context = this;
    //only execute if there is data
    if (this.props.boards) {
      var list = Object.keys(this.props.boards).map(function(item, index) {
        var temp = context.props.boards[item];
        return (
          <li key={index}>
            <span onClick={context.showBoard.bind(null, temp._id, temp.title, temp._id)}>
              <input type="text" id={temp._id} value={context.state.boards[temp._id] ? context.state.boards[temp._id].title : temp.title}
                disabled={(context.state.editBoard[temp._id] == undefined) ? true : context.state.editBoard[temp._id] }
                onChange={context.onAddInputChanged}
                onKeyPress={context.handleKeyPress}/>
            </span>
            <input type="button" value="Delete Board"
              onClick={context.deleteBoard.bind(null, temp._id)}/>
            <input type="button" value="Edit Board"
              onClick={context.editBoardName.bind(null, temp._id)}/>
          </li>
        );
      });
    }
    return (
      <div>
        <ul>{list}</ul>
        <input type="button" value="Add Board" onClick={this.showCreateBoard}/>
        {this.state.showCreateBoard ?
          <CreateItems onAddInputChanged={this.onAddInputChanged}
            addItems={this.addBoard} name="addBoard"/> : null}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  boards: state.boards
});
export default connect(mapStateToProps)(Boards);
