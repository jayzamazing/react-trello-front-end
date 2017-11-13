import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, length, isTrimmed} from '../validators';
import Modal from 'react-modal';

export function UpdateBoardForm(props) {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => props.closeModal()}
      contentLabel="Update Board Modal"
      className={{
        base: 'update-board',
        afterOpen: 'update-board-after-open',
        beforeClose: 'update-board-before-close'
      }}
      overlayClassName={{
        base: 'update-board-overlay',
        afterOpen: 'update-board-overlay-after-open',
        beforeClose: 'update-board-overlay-before-close'
      }}>
      <form className="update-board-input-area"
        onSubmit={props.handleSubmit(values =>
        {props.onSubmit(props.boardId, values.boardTitle)})}>
        <span className="center-text"><h5>Rename Board</h5></span>
          <button type="button" className="btn btn-default close-modal-btn"
            aria-label="close button" onClick={() => props.closeModal()}>
              <span className="glyphicon glyphicon-remove"
                aria-hidden="true"></span>
          </button>
        <hr/>

        <Field
          component={Input}
          type="text"
          name="boardTitle"
          validate={[required, nonEmpty, isTrimmed]}
          inputClass="update-board-input"
          placeholder="Update board title"
          label="Name"
          labelclass="update-label"
        />
        <button className="update-board-btn btn btn-success"
            type="submit"
            disabled={props.pristine || props.submitting}>
            Rename
        </button>
      </form>
    </Modal>
  );
}
export default reduxForm({
    form: 'updateboard',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updateboard', Object.keys(errors)[0]))
})(UpdateBoardForm);
