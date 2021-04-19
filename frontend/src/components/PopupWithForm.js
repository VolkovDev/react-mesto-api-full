function PopupWithForm(props) {

  return (
    <>
      <div className={props.isOpen ? `pop-up pop-up_type_${props.name} pop-up_opened` : `pop-up pop-up_type_${props.name}`}>
        <div className={`pop-up__container pop-up__container_opened_${props.name}`} >
          <button 
            className={`pop-up__btn-close pop-up__btn-close_type_${props.name}`}
            type='button'
            aria-label='Закрыть форму'
            onClick={props.onClose}
          ></button>
          <form 
            onSubmit={props.onSubmit}
            name={`${props.name}`} 
            action='#' 
            className={`pop-up__form pop-up__form_${props.name}`} 
            method='POST'
            disabled={props.loadingIndicator}
          >
            <h3 className='pop-up__form-title'>{props.title}</h3>
              {props.children}
          <button 
            className='pop-up__form-btn-submit pop-up__form-btn-submit_comfirm' 
            type='submit'
          >{props.buttonText}</button>
          </form>
        </div>
      </div>
    </>
  )
}
export default PopupWithForm