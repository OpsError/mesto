import Card from './Card.js';
import FormValidator from './FormValidator.js';

const page = document.querySelector('.page');

const popupList = page.querySelectorAll('.popup');
const popupForm = page.querySelectorAll('.popup__form-set');

const formEditProfile = page.querySelector('.form-edit');
const formAddCard = page.querySelector('.form-add');
const imageFull = page.querySelector('.image-full');

const buttonEdit = page.querySelector('.profile__edit-button');
const buttonAdd = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const popupEdit = formEditProfile.querySelector('.popup');
const nameInputEdit = formEditProfile.querySelector('.popup__input_type_name');
const jobInputEdit = formEditProfile.querySelector('.popup__input_type_description');
const buttonSaveEditForm = formEditProfile.querySelector('.popup__save');

const popupAdd = formAddCard.querySelector('.popup');
const nameInputAdd = formAddCard.querySelector('.popup__input_type_title');
const srcInputAdd = formAddCard.querySelector('.popup__input_type_link');
const buttonSaveAddForm = formAddCard.querySelector('.popup__save');

export const popupImage = imageFull.querySelector('.popup');
const imageFigure = imageFull.querySelector('.popup__image-container');
export const imageFullFromCard = popupImage.querySelector('.popup__image');
export const imageDescription = imageFigure.querySelector('.popup__figcaption');

const elementsSection = page.querySelector('.elements');

const validationConfig = {
  // formSelector: '.popup__form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


// ===================================================================================================

//обработчик карточек
function handleSubmitFormAddCard(evt){
  evt.preventDefault();
  const name = nameInputAdd.value;
  const link = srcInputAdd.value;

  // createCard({name, link});
  // const cardWithInputData = createCard({name, link});
  const cardWithInputData = new Card ({name, link}, '#element');
  const cardElement = cardWithInputData.generateCard();
  renderCard(cardElement);

  closePopup(popupAdd);
}

//добавление карточки на страницу
function renderCard(elementCard){
  elementsSection.prepend(elementCard);
}

//закрыть попап на esc
const closePopupEscape = (evt) => {
  if (evt.key === 'Escape'){
    const popupClass = page.querySelector('.popup_opened');
    closePopup(popupClass);
  }
}

//закрыть попап нажатием на оверлей/крестик
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon'))) {
      closePopup(popup);
    }
  });
});

//открыть попап
export function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

//закрыть попап
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

//изменить имя/описание
function handleSubmitFormEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = jobInputEdit.value;
    closePopup(popupEdit);
}

//добавление карточек из массива
initialCards.forEach(card => {
  const initialCard = new Card (card, '#element');
  const cardElement = initialCard.generateCard();
  renderCard(cardElement);
});

// ========================================================================================================

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInputAdd.value = '';
  srcInputAdd.value = '';
  const formValidation = new FormValidator(validationConfig, '.popup__form');
  formValidation.blockButtonSave(popupAdd);
  formValidation.enableValidation();
});

buttonEdit.addEventListener('click', () => {
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  openPopup(popupEdit);
  const formValidation = new FormValidator(validationConfig, '.popup__form');
  formValidation.enableValidation();
});

formEditProfile.querySelector('.popup__form').addEventListener('submit', handleSubmitFormEditProfile);

formAddCard.querySelector('.popup__form').addEventListener('submit', handleSubmitFormAddCard);