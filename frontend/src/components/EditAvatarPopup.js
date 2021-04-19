import React from 'react'
// import { useContext } from 'react'
import PopupWithForm from './PopupWithForm'
// import {CurrentUserContext} from "../contexts/CurrentUserContext"

function EditAvatarPopup( { isOpen, onClose, onUpdateAvatar }) {
  // const currentUser = useContext(CurrentUserContext)

  // const [avatar, setAvatar] = useState('')
  const avatarRef = React.useRef()

  // Обработчик изменения инпута обновляет стейт
  // function avatarHandleChange(e) {
  //   setAvatar(e.target.value)
  // }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    })
  }

  return (
    <PopupWithForm
    title='Обновить аватар'
    name='avatar'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText='Сохранить'
  >
    <input
      ref={avatarRef}
      name='input-avatar'
      id='avatar-input'
      type='url'
      className='pop-up__form-input pop-up__form-input_type_link-avatar'
      placeholder='Ссылка на картинку'
      required
    />
    <span
      className='pop-up__form-input-error'
      id='avatar-input-error'
    ></span>

  </PopupWithForm>
  )
}

export default EditAvatarPopup