import React from 'react';
import Modal from 'react-modal';
import CreateBoardForm from './create-board-form';

export default class CreateBoardModal extends React.Component {
  componentWillMount() {
      Modal.setAppElement('body');
  }
  render() {
    return (
      <Modal isOpen={this.props.isOpen}
        onRequestClose={this.props.closeModal}
        contentLabel="Create Board Modal"
        className={{
          base: 'create-board',
          afterOpen: 'create-board-after-open',
          beforeClose: 'create-board-before-close'
        }} overlayClassName={{
          base: 'create-board-overlay',
          afterOpen: 'create-board-overlay-after-open',
          beforeClose: 'create-board-overlay-before-close'
        }}>
        <CreateBoardForm onSubmit={this.props.onSubmit} closeModal={this.props.closeModal}/>
      </Modal>
    );
  }
}
