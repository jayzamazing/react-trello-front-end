import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty} from '../validators';
import {connect} from 'react-redux';
import {updateCardslist} from '../actions/cardslist';
import {updateBoardSuccess} from '../actions/boards';
import {submitUpdate, blurUpdate} from './utils';

export class UpdateCardslistForm extends React.Component {
  render() {
    return (
      <form className="update-cardslist-area" ref="updatecardslistform"
        onSubmit={this.props.handleSubmit(values =>
        {this.props.updateCardslist(this.props._id, values[this.props._id].title ? values[this.props._id].title : values[this.props._id], this.props.boardId, this.props.board);})}>
          <Field
            format={(data) => data ? data.title : this.props.initialValues[this.props._id].title}
            component={Textarea}
            name={this.props._id}
            validate={[required, nonEmpty]}
            textareaClass="updateCardslist"
            onKeyPress={e => submitUpdate(e)}
            onBlur={() => blurUpdate(this, 'updatecardslistform')}
          />
      </form>
    );
  }
}
const mapStateToProps = (state, props) => ({
  initialValues: state.cardslist
});
const mapDispatchToProps = (dispatch) => ({
  //dispatch update to cardslist name if enter key is pressed
  updateCardslist: (cardslistId, cardslistTitle, boardId, board) => {
    dispatch(updateCardslist(cardslistId, {
      title: cardslistTitle
    }))
    .then((res) => {
      const keys = Object.keys(res.cardslist);
      let mutableBoard = [];
      if (board.cardslist) {
        mutableBoard = board.cardslist.asMutable();
      }
      mutableBoard.push(keys[0]);
      dispatch(updateBoardSuccess(boardId, {_id: boardId, cardslist: mutableBoard}));
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'updatecardslist',
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updatecardslist', Object.keys(errors)[0]))
})(UpdateCardslistForm));
