import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../validators';

export function CreateCardslistForm(props) {
  return (
    <form className="create-cardslist-area cardslist-tile"
      onSubmit={
        props.handleSubmit(values => {
          props.onSubmit(values.cardslistTitle, props.boardId, props.board);
      })}>
        <Field
          component={Input}
          type="text"
          name="cardslistTitle"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="Add a list"
          labelclass="remove"
          inputClass="updateCardslist"
        />
        <button className="create-cardslist-btn btn btn-success"
          type="submit"
          disabled={props.pristine || props.submitting}>
          Save
        </button>
        <button type="button" className="btn btn-default close-cardslist-btn"
          aria-label="close button" onClick={() => props.close()}>
            <span className="glyphicon glyphicon-remove"
              aria-hidden="true"></span>
        </button>
      </form>
  );
}
export default reduxForm({
    form: 'createcardslist',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('createcardslist', Object.keys(errors)[0]))
})(CreateCardslistForm);
