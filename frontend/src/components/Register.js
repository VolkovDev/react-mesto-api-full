import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../auth'

const Register = ({ setIsRegisterPopupOpen, setOnFail }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('password: ',password, ' email: ', email)
    register( password, email )
      .then((res) => {
        if (res) {
          setIsRegisterPopupOpen(res)
          setOnFail('')
          history.push('/signin')
        } else {
          setIsRegisterPopupOpen(res.data)
        }
      })
      .catch((err) => {
        console.log(`Error handleSubmit register: ${err}`)
      })
  }

  return (
    <div className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='email'
          placeholder='Email'
          required={true}
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Пароль'
          required={true}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <button type='submit' className='auth__submit-btn'>
          Зарегистрироваться
        </button>
        <Link className='auth__sign-in' to='/signin'>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  )
}

export default Register