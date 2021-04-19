import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupDeleteCard({ isOpen, onClose, card, onDeleteCard, loadingIndicator }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Вы уверены?'
      isOpen={isOpen}
      onClose={onClose}
      buttonText={'Да'}
      onSubmit={handleSubmit}
      loadingIndicator={loadingIndicator}
    ></PopupWithForm>
  );
}

export default PopupDeleteCard;