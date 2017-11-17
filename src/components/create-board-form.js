import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Modal from 'react-modal';

export function CreateBoardForm(props) {
  return (<form className="create-board-input-area" onSubmit={props.handleSubmit(values => {
      props.onSubmit(values.boardTitle);
    })}>
    <Field component={Input} type="text" name="boardTitle" validate={[required, nonEmpty, isTrimmed]} inputClass="create-board-input" placeholder="Add board title" labelclass="remove"/>
    <button type="button" className="btn btn-default close-modal-btn" aria-label="close button" onClick={() => props.closeModal()}>
      <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </button>
    <button className="create-board-btn btn" type="submit" disabled={props.pristine || props.submitting}>
      Create Board
    </button>
  </form>);
}
export default reduxForm({
  form: 'createboard',
  onSubmitFail: (errors, dispatch) => dispatch(focus('createboard', Object.keys(errors)[0]))
})(CreateBoardForm);
