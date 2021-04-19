import React from 'react'
import { Route, Link, useHistory } from 'react-router-dom';
import logo from '../images/logo_mesto.svg';

function Header({ userEmail, onQuit }) {

  const history = useHistory();

  const quit = () => {
    onQuit();
    localStorage.removeItem('jwt');
    history.push('/login');
  }

  return (
    <>
      <header className='header'>
        <Route path='/signup'>
          <a href='https://praktikum.yandex.ru/' className='header__link' target='_blank'>
            <img 
              src={logo} 
              alt='логотип'
              className='header__logo' 
            />
          </a>
          <Link className='header__link-login' to='/signin'>
            Войти
          </Link>
        </Route>
        <Route path='/signin'>
          <a href='https://praktikum.yandex.ru/' className='header__link' target='_blank'>
            <img 
              src={logo} 
              alt='логотип'
              className='header__logo' 
            />
          </a>
          <Link className='header__link-login' to='/signup'>
            Регистрация
          </Link>
        </Route>
        <Route path='/main'>
          <a href='https://praktikum.yandex.ru/' className='header__link' target='_blank'>
            <img 
              src={logo} 
              alt='логотип'
              className='header__logo' 
            />
          </a>
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