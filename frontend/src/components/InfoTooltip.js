import React from 'react'
import Error from '../images/Error.svg'
import Success from '../images/Success.svg'

const InfoTooltip = ({ isOpen, onClose }) => {
  return (
    <div className={`pop-up ${isOpen ? 'pop-up_opened' : ''}`}>
      <div className='pop-up__container
      pop-up__container_type_tooltip'>
        <img
          alt='тут должна быть иконка'
          className='pop-up__img'
          src={isOpen.success ? Success : Error}
        />
        <h2 className={'pop-up__form-title pop-up__title_type_tooltip'}>
          {isOpen.data ? 'Вы успешно зарегистрировались!' : isOpen.message}
        </h2>
        <button 
        className={`pop-up__btn-close
        pop-up__btn-close_type_tooltip`}
        type='button'
        aria-label='Закрыть форму'
        onClick={onClose}
        />
      </div>
    </div>
  )
}

export default InfoTooltip