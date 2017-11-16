import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import {connect} from 'react-redux';
import {updateCards} from '../actions/cards';
import {submitUpdate, blurUpdate} from './utils';
import './update-cards-form.css';

export class UpdateCardsForm extends React.Component {
  render() {
    return (
      <form className="update-cards-area" ref="updatecardsform"
      onSubmit={this.props.handleSubmit(values =>
      {this.props.updateCards(this.props._id, values[this.props._id].title ? values[this.props._id].title : values[this.props._id]);})}>
          <Field
            format={(data) => data.title}
            component={Textarea}
            name={this.props._id}
            validate={[required, nonEmpty]}
            textareaClass="updateCards"
            onKeyPress={e => submitUpdate(e)}
            onBlur={() => blurUpdate(this, 'updatecardsform')}
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
  updateCards: (cardsId, cardsTitle, cardsText) => {
    dispatch(updateCards(cardsId, {
      title: cardsTitle,
      cardsText: cardsText
    }));
  }
});
UpdateCardsForm = reduxForm({
    form: 'updatecards',
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updatecards', Object.keys(errors)[0]))
})(UpdateCardsForm);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardsForm);
