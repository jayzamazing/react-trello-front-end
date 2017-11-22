import React from 'react';
import Modal from 'react-modal';
import UpdateCardsTextForm from './update-cardstext-form';
import UpdateCardsTitleForm from './update-cardstitle-form';
import './update-cards-modal.css';

export default function UpdateCardsModal(props) {
  return (
    <Modal isOpen={props.isOpen}
      onRequestClose={() => props.closeModal()}
      contentLabel="Update Cards Modal"
      className={{
        base: 'update-cards-modal',
        afterOpen: 'update-cards-modal-after-open',
        beforeClose: 'update-cards-modal-before-close'
      }} overlayClassName={{
        base: 'update-cards-modal-overlay',
        afterOpen: 'update-cards-modal-overlay-after-open',
        beforeClose: 'update-cards-modal-overlay-before-close'
      }}>
      <button type="button" className="btn btn-default close-modal-btn" aria-label="close button"
        onClick={() => props.closeModal()}>
        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
      </button>
        <UpdateCardsTitleForm index={props.index} _id={props._id} form={props._id + '-2'}/>
        <UpdateCardsTextForm _id={props._id}/>
      </Modal>
  );
}
