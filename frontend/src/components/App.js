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

  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
    _id: '',
    email: '',
  })

  const [cards, setCards] = useState([])
  const [userEmail, setUserEmail] = useState('')
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [onFail, setOnFail] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [isDeleteCardsPopupOpen, SetIsDeleteCardsPopupOpen] = useState(false);

  const history = useHistory()

  useEffect(() => {
    if (loggedIn) {
      api.getDataUserAndCards()
        .then((response => {
          const [userData, cardsData] = response
          console.log('login getDataUserAndCards: ', userData)
          setCurrentUser(userData)
          setUserEmail(userData.email)
          setCards(cardsData)
        }))
        .catch((err) => {
          console.log(err);
      })
    }
  }, [loggedIn])

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      checkToken(jwt)
        .then((data) => {
          if (data) {
            setUserEmail(data.email)
            setLoggedIn(true)
            history.push('/')
          }
        })
        .catch((err) => {
          console.log(`Error checkToken: ${err} `)
        })
    }
  }

  useEffect(() => {
    tokenCheck()
  }, [history])

  const handleLogin = () => {
    setLoggedIn(true)
  }

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
    // ?????????? ??????????????????, ???????? ???? ?????? ???????? ???? ???????? ????????????????
    const isLiked = card.likes.some(i => i === currentUser._id)
    
    // ???????????????????? ???????????? ?? API ?? ???????????????? ?????????????????????? ???????????? ????????????????
    api.putHandlerLike(card._id, !isLiked).then((newCard) => {
        // ?????????????????? ?????????? ???????????? ???? ???????????? ????????????????????, ???????????????????? ?? ???????? ?????????? ????????????????
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // ?????????????????? ??????????
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
        setCards([newCard, ...cards])
        closeAllPopups()
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false)
    setUserEmail('')
    history.push('/signin')
    console.log('handleLogout: ', currentUser)
  }

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
              <Route exact path="/"> 
                {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
                  <ProtectedRoute
                      exact
                      path='/'
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
              </Route>
            
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
            title='?????????? ??????????'
            name='add-card'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            buttonText='??????????????'
          />

          {/* Popup avatar */}
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}
          /> 


          {/* Popup confirm */}
          <PopupWithForm
            title='???? ???????????????'
            name='confirm'
            onClose={closeAllPopups}
            buttonText='????'
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
