import React from 'react';
import UpdateCardsTitleForm from './update-cardstitle-form';
import UpdateCardsModal from './update-cards-modal.js';

export default class UpdateCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editCardsModalIsOpen: false,
      modaloredit: true
    }
    this.closeModal = this.closeModal.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
  }
  //used for editing the title
  enableEdit() {
    this.setState({modaloredit: false});
  }
  disableEdit() {
    this.setState({modaloredit: true});
  }
  //used to display the edit cards modal
  showUpdateCardsModal() {
    this.setState({editCardsModalIsOpen: true});
  }
  closeModal() {
    this.setState({editCardsModalIsOpen: false});
  }
  render() {
    return (
      <div className="edit-title-or-entire-card">
        <span onClick={this.state.modaloredit ? () => this.showUpdateCardsModal() : null}>
        <UpdateCardsTitleForm index={this.props.index}
          disabled={this.state.modaloredit ? 'true' : null}
          onBlur={this.state.modaloredit ? null : this.disableEdit}
          _id={this.props._id} card={this.props.card} form={this.props._id + '-1'} />
        </span>
        <span onClick={() => this.enableEdit()} className="glyphicon glyphicon-pencil edit-cards">
        </span>
        <UpdateCardsModal _id={this.props._id} isOpen={this.state.editCardsModalIsOpen}
          closeModal={this.closeModal} index={this.props.index} deleteCards={this.props.deleteCards}
          updateCards={this.props.updateCards} cardslistId={this.props.cardslist._id} cardslist={this.props.cardslist}/>
      </div>
    );
  }
}
