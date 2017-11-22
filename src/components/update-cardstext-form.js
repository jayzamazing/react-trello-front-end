import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import {connect} from 'react-redux';
import {updateCards} from '../actions/cards';
import {submitUpdate, blurUpdate} from './utils';
import './update-cardstext-form.css';

export class UpdateCardsTextForm extends React.Component {
  render() {
    return (
      <form className="update-cardstext-area" ref="updatecardstextform"
      onSubmit={this.props.handleSubmit(values => this.props.updateCards(this.props._id, values.text))}>
          <Field
            format={(data) => data ? data.text : this.props.initialValues.text}
            component={Textarea}
            name={this.props._id}
            validate={[required, nonEmpty]}
            textareaClass="updateCardsText"
            onKeyPress={e => submitUpdate(e)}
            onBlur={() => blurUpdate(this, 'updatecardstextform')}
          />
      </form>
    );
  }
}
const mapStateToProps = (state, props) => ({
  initialValues: state.cards[props._id]
});

const mapDispatchToProps = (dispatch) => ({
  //dispatch update to cards name if enter key is pressed
  updateCards: (cardsId, cardsText) => {
    dispatch(updateCards(cardsId, {
      text: cardsText
    }));
  }
});
UpdateCardsTextForm = reduxForm({
    form: 'updatecards',
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updatecards', Object.keys(errors)[0]))
})(UpdateCardsTextForm);
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCardsTextForm);
