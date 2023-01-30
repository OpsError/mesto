  //закрыть попап
  export function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEscape);
  }
  
  //закрыть попап на esc
  export const closePopupEscape = (evt) => {
    if (evt.key === 'Escape'){
      const popupClass = document.querySelector('.popup_opened');
      closePopup(popupClass);
    }
  }

  //открыть попап
  export function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEscape);
  }

  const imageFull = document.querySelector('.image-full');
  const imageFigure = imageFull.querySelector('.popup__image-container');
  export const popupImage = imageFull.querySelector('.popup');
  export const imageFullFromCard = popupImage.querySelector('.popup__image');
  export const imageDescription = imageFigure.querySelector('.popup__figcaption');