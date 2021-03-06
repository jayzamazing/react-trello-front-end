import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty, isTrimmed} from '../validators';

export function CreateCardsForm(props) {
  return (
    <form className="create-cards-area cards-tile"
      onSubmit={
        props.handleSubmit(values => {
        props.onSubmit(values.cardsTitle, values.cardsText, props.cardslist._id, props.cardslist)
      })}>
        <Field
          component={Textarea}
          name="cardsTitle"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="Add a card"
          textareaClass="addcards"
        />
        <button className="create-cards-btn btn btn-success"
          type="submit"
          disabled={props.pristine || props.submitting}>
          Add
        </button>
        <button type="button" className="btn btn-default close-cards-btn"
          aria-label="close button" onClick={() => props.close()}>
            <span className="glyphicon glyphicon-remove"
              aria-hidden="true"></span>
        </button>
      </form>
  );
}
export default reduxForm({
    form: 'createcards',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createcards', Object.keys(errors)[0]))
})(CreateCardsForm);
