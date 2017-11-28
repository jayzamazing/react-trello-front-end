import React from 'react';
import {reduxForm, Field, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty} from '../validators';
import {connect} from 'react-redux';

export class UpdateBoardForm  extends React.Component {
  render() {
    return (
        <form className="update-board-input-area"
          onSubmit={this.props.handleSubmit(values =>
          {this.props.onSubmit(this.props.boardId, values[this.props.boardId])})}>
          <span className="center-text"><h5>Rename Board</h5></span>
            <button type="button" className="btn btn-default close-modal-btn"
              aria-label="close button" onClick={() => this.props.closeModal()}>
                <span className="glyphicon glyphicon-remove"
                  aria-hidden="true"></span>
            </button>
          <hr/>

          <Field
            component={Input}
            type="text"
            name={this.props.boardId}
            validate={[required, nonEmpty]}
            inputClass="update-board-input"
            placeholder="Update board title"
            label="Name"
            labelclass="update-label"
            onChange={e => this.setState({[this.props.boardId]: e.target.value})}
          />
          <button className="update-board-btn btn btn-success"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}>
              Rename
          </button>
        </form>
    );
  }
}
const mapStateToProps = (state, props) => ({
  initialValues: {[props.boardId]: state.boards[props.boardId].title}
});

UpdateBoardForm = reduxForm({
    form: 'updateboard',
    enableReinitialize : true,
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('updateboard', Object.keys(errors)[0]))
})(UpdateBoardForm);
export default connect(mapStateToProps)(UpdateBoardForm);
