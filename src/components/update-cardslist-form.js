import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Textarea from './textarea';
import {required, nonEmpty, length, isTrimmed} from '../validators';

export function UpdateCardslistForm(props) {
  return (
    <form className="update-cardslist-area">
        <Field
          component={Textarea}
          name={'cardslistTitle-' + props.index}
          validate={[required, nonEmpty, isTrimmed]}
          textareaClass="updateCardslist"
          defaultValue={props.defaultValue}
          onKeyPress={(e) => props.onKeyPress(e, props._id, props.boardId, props.board)}
          onBlur={(e) => props.onBlur(e, props._id, props.boardId, props.board)}
        />
    </form>
  );
}
export default reduxForm({
    form: 'updatecardslist',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updatecardslist', Object.keys(errors)[0]))
})(UpdateCardslistForm);
