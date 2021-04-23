/* eslint-disable react-hooks/exhaustive-deps */
import '../index.css'
import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import  api  from '../utils/api'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'
import PopupDeleteCard from './PopupDeleteCard'
import { checkToken } from '../auth'



function App() {

  const [cards, setCards] = useState([])
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [onFail, setOnFail] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [isDeleteCardsPopupOpen, SetIsDeleteCardsPopupOpen] = useState(false);

  const history = useHistory()

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setUserEmail(res.email)
            setCurrentUser(res)
            history.push('/main')
          }
        })
        .catch((err) => {
          console.log(`Error checkToken: ${err} `)
        })
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [loggedIn, history])

  const handleLogin = () => {
    setLoggedIn(true)
  }

  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    email: '',
  })


  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardImageClick() {
    setIsImagePopupOpen(true)
  }

  function handleDeleteCardsClick() {
    SetIsDeleteCardsPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name, about}) {
    api.patchEditProfile({name, about})
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.patchRefreshAvatar({avatar})
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsRegisterPopupOpen(false)
    SetIsDeleteCardsPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id)
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.putHandlerLike(card._id, !isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // Обновляем стейт
      setCards(newCards)
    })
    .catch(err => console.log(err))
  }

  const [deleteCard, setDeleteCard] = useState({});

  function onHandleCardDelete(card) {
    handleDeleteCardsClick();
    setDeleteCard(card);
  }

  function handleCardDelete(deleteCard) {
    setIsLoading(true)
    api.deleteCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deleteCard._id)
        setCards(newCards)
        setIsLoading(false)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true)
    api.postAddNewCard({ name, link })
      .then((newCard) => {
        console.log('handleAddPlaceSubmit newCard: ', newCard.data)
        console.log('handleAddPlaceSubmit cards: ', cards)
        setCards([newCard.data, ...cards])
        closeAllPopups()
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  function handleLogout() {
    setLoggedIn(false)
  }

  useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        console.log('getInitialCards: ', initialCards)
        setCards(initialCards)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.getInfoUser()
      .then(data => {
        console.log('getInfoUser: ', data)
        setCurrentUser(data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    function handleEscClose(evt) {
      return evt.key === 'Escape' ? closeAllPopups() : null
    }

    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen || isRegisterPopupOpen) {
      document.addEventListener('keydown', handleEscClose)
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen, isRegisterPopupOpen])

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>

        <Header userEmail={userEmail} onQuit={handleLogout} />
            <Switch>
            <ProtectedRoute
                path='/main'
                loggedIn={loggedIn}
                component={Main}
                loadingIndicator={isloading}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardImageClick={handleCardImageClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={onHandleCardDelete}
            />
              <Route path='/signup'>
                <Register
                  setIsRegisterPopupOpen={setIsRegisterPopupOpen}
                  isOpen={isRegisterPopupOpen}
                  setOnFail={setOnFail}
                />
              </Route>
              <Route path='/signin'>
                <Login handleLogin={handleLogin} onFail={onFail} setOnFail={setOnFail} />
              </Route>
              <Route>
                {loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' />}
              </Route>
            </Switch>
          < Footer />

        {/* Popup InfoTooltip */}
          <InfoTooltip isOpen={isRegisterPopupOpen} onClose={closeAllPopups} />
          
          {/* Popup profile */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* Popup card */}
          <AddPlacePopup
            title='Новое место'
            name='add-card'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText='Создать'
          />

          {/* Popup avatar */}
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          /> 


          {/* Popup confirm */}
          <PopupWithForm
            title='Вы уверены?'
            name='confirm'
            onClose={closeAllPopups}
            buttonText='Да'
          >

          </PopupWithForm>

          {/* Popup image */}
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isOpen={isImagePopupOpen}
          />

          <PopupDeleteCard
            isOpen={isDeleteCardsPopupOpen}
            onClose={closeAllPopups}
            card={deleteCard}
            onDeleteCard={handleCardDelete}
            loadingIndicator={isloading}
          />

        </div>
      </CurrentUserContext.Provider>
  )
}

export default App
