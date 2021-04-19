import React from 'react'
import {useState, useEffect, useContext} from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = useContext(CurrentUserContext)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // Обработчик изменения инпута обновляет стейт
  function nameHandleChange(e) {
    setName(e.target.value)
  }

  // Обработчик изменения инпута обновляет стейт
  function descriptionHandleChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault()

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    })
  } 

  // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
useEffect(() => {
  setName(currentUser.name)
  setDescription(currentUser.about)
}, [currentUser]) 

  return (
        <PopupWithForm
          title='Редактировать профиль'
          name='profile'
          onClose={onClose}
          isOpen={isOpen}
          onSubmit={handleSubmit}
          buttonText='Сохранить'
        >
          <input
            value={name}
            onChange={nameHandleChange}
            name='input-name'
            type='text'
            id='name-input'
            className='pop-up__form-input pop-up__form-input_type_name'
            placeholder='Имя Фамилия'
            required
            minLength='2'
            maxLength='40'
            autoComplete='off'
          />
          <span
            className='pop-up__form-input-error'
            id='name-input-error'
          ></span>

          <input
            value={description}
            onChange={descriptionHandleChange}
            name='input-hobby'
            type='text'
            id='hobby-input'
            className='pop-up__form-input pop-up__form-input_type_hobby'
            placeholder='Хобби'
            required
            minLength='2'
            maxLength='200'
            autoComplete='off'
          />
          <span
            className='pop-up__form-input-error'
            id='hobby-input-error'
          ></span>
        </PopupWithForm>
  )

}

export default EditProfilePopup