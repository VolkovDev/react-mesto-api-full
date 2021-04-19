function ImagePopup(props) {
  
  return (
    <>
      <div 
        className={
          props.isOpen ? `pop-up pop-up_type_image-zoom pop-up_opened` : `pop-up pop-up_type_image-zoom`
        }
      >
        <div 
          className='pop-up__container pop-up__container_opened_image-zoom'
        >
            <button 
              className='pop-up__btn-close pop-up__btn-close_type_image-zoom'
              type='button'
              aria-label='Закрыть форму'
              onClick={props.onClose}
            ></button>
            <img className='pop-up__img' src={props.card.link} alt={props.card.name} />
            <div 
              className='pop-up__description'
            >
              {props.card.name}
            </div>
        </div>
    </div>
    </>
  )
}
export default ImagePopup