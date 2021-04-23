import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardImageClick, onCardLike, onCardDelete, loadingIndicator}) {
  const currentUser  = useContext(CurrentUserContext);
  
  function handleClick() {
    onCardClick(card);
    onCardImageClick()
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `card__delete-btn ${isOwn ? '' : 'card__delete-btn_non-active'}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `card__like-btn ${ isLiked ? 'card__like-btn_active' : ''}`
);

  return (
    <>
      <article className="card">
        <img 
          className="card__image"
          src={
            card.link
            }
          alt={card.name}
          onClick={handleClick} 
        />
        <button 
          onClick={handleDeleteClick}
          className={cardDeleteButtonClassName}
          type="button"
        ></button>
        <div
          className="card__element"
        >
          <h2
            className="card__title"
          > {
              card.name
            }</h2>
          <div 
            className="card__like-container"
          >
            <button
              id="likeButton"
              className={cardLikeButtonClassName}
              aria-label='Поставить лайк'
              type="button"
              onClick={handleLikeClick}
              disabled={loadingIndicator}
            ></button>
            <div 
              className="card__like-counter"
            > {
              card.likes.length
              }
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
export default Card