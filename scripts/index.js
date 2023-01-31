import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {openPopup, closePopupEscape, closePopup} from "./ImageData.js";

const page = document.querySelector('.page');

const popupList = page.querySelectorAll('.popup');

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

const popupAdd = formAddCard.querySelector('.popup');
const nameInputAdd = formAddCard.querySelector('.popup__input_type_title');
const srcInputAdd = formAddCard.querySelector('.popup__input_type_link');

const imageFigure = imageFull.querySelector('.popup__image-container');

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

const formAddValidation = new FormValidator(validationConfig, formAddCard.querySelector('.popup__form'));
const formEditValidation = new FormValidator(validationConfig, formEditProfile.querySelector('.popup__form'));
formAddValidation.enableValidation();
formEditValidation.enableValidation();


// ===================================================================================================

//обработчик карточек
function handleSubmitFormAddCard(evt){
  evt.preventDefault();
  const name = nameInputAdd.value;
  const link = srcInputAdd.value;

  const cardElement = createNewCard({name, link});
  renderCard(cardElement);

  closePopup(popupAdd);
}

//добавление карточки на страницу
function renderCard(elementCard){
  elementsSection.prepend(elementCard);
}

//закрыть попап нажатием на оверлей/крестик
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon'))) {
      closePopup(popup);
    }
  });
});

//изменить имя/описание
function handleSubmitFormEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = jobInputEdit.value;
    closePopup(popupEdit);
}

function createNewCard(card) {
  const initialCard = new Card (card, '#element');
  return initialCard.generateCard();
}

//добавление карточек из массива
initialCards.forEach(card => {
  const cardElement = createNewCard(card);
  renderCard(cardElement);
});

// ========================================================================================================

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInputAdd.value = '';
  srcInputAdd.value = '';
  formAddValidation.blockButtonSave(popupAdd);
});

buttonEdit.addEventListener('click', () => {
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  openPopup(popupEdit);
});

formEditProfile.querySelector('.popup__form').addEventListener('submit', handleSubmitFormEditProfile);

formAddCard.querySelector('.popup__form').addEventListener('submit', handleSubmitFormAddCard);