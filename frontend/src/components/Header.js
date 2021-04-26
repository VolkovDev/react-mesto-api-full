import React from 'react'
import { Route, Link } from 'react-router-dom';
import logo from '../images/logo_mesto.svg';

function Header({ userEmail, onQuit }) {

  const quit = () => {
    onQuit();
  }

  return (
    <>
      <header className='header'>
        <a href='https://praktikum.yandex.ru/' className='header__link' target='_blank'>
            <img 
              src={logo} 
              alt='логотип'
              className='header__logo' 
            />
        </a>
        <Route path='/signup'>
          <Link className='header__link-login' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className='header__link-login' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route exact path='/'>
          <p className='header__user-email'>{userEmail}</p>
          <Link className='header__link-login' to='/signin' onClick={quit}>
            Выйти
          </Link>
        </Route>

      </header>
    </>
  )
}
export default Header