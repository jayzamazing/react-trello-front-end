import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import {connect} from 'react-redux';
import {updateCards} from '../actions/cards';
import {submitUpdate, blurUpdate} from './utils';
import './update-cardstitle-form.css';

export class UpdateCardsTitleForm extends React.Component {
  render() {
    return (

      <form className="update-cardstitle-area" ref="updatecardsform"
      onSubmit={
        this.props.handleSubmit(values => this.props.updateCards(this.props._id, values.title ? values.title : values[this.props._id]))
      }>
          <Field
            format={(data) => data.title}
            component={Textarea}
            name={this.props._id}
            validate={[required, nonEmpty]}
            textareaClass="updateCardsTitle"
            onKeyPress={e => submitUpdate(e, this.props.initialValues[this.props._id].asMutable(), 'title')}
            onBlur={() => blurUpdate(this, 'updatecardsform')}
            disabled={this.props.disabled}
          />
      </form>
    );
  }
}
const mapStateToProps = (state, props) => ({
  initialValues: state.cards
});

const mapDispatchToProps = (dispatch) => ({
  //dispatch update to cards name if enter key is pressed
  updateCards: (cardsId, cardsTitle) => {
    dispatch(updateCards(cardsId, {
      title: cardsTitle
    }));
  }
});
UpdateCardsTitleForm = reduxForm({
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updatecards', Object.keys(errors)[0]))
})(UpdateCardsTitleForm);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardsTitleForm);
