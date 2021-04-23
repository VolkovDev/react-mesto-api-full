import React from 'react'
import {useState} from 'react'
import PopupWithForm from './PopupWithForm'
// import {CurrentUserContext} from "../contexts/CurrentUserContext"

function AddPlacePopup({ isOpen, onClose, onAddPlace }){
  // const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

    // Обработчик изменения инпута обновляет стейт
    function nameHandleChange(e) {
      setName(e.target.value)
    }

    // Обработчик изменения инпута обновляет стейт
    function linkHandleChange(e) {
      setLink(e.target.value)
    }


  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({ 
      name, 
      link 
    })
    setName('')
    setLink('')
  }

  return (
    <PopupWithForm
    title='Новое место'
    name='add-card'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText='Создать'
  >
    <input
      value={name}
      onChange={nameHandleChange}
      name='input-name-image'
      type='text'
      id='name-image-input'
      className='pop-up__form-input pop-up__form-input_type_image'
      placeholder='Название'
      required
      minLength='2'
      maxLength='30'
      autoComplete='off'
    />
    <span
      className='pop-up__form-input-error'
      id='name-image-input-error'
    ></span>
    <input
      value={link}
      onChange={linkHandleChange}
      name='input-url'
      type='url'
      id='url-input'
      className='pop-up__form-input pop-up__form-input_type_url'
      placeholder='Ссылка на картинку'
      required
      autoComplete='off'
    />
    <span
      className='pop-up__form-input-error'
      id='url-input-error'
    ></span>

  </PopupWithForm>
  )
}

export default AddPlacePopup