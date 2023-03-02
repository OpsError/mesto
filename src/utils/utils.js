import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupDelete from "../components/PopupDelete.js";
  
const page = document.querySelector('.page');
  
export const formEditProfile = page.querySelector('.form-edit');
export const formAddCard = page.querySelector('.form-add');
export const imageFull = document.querySelector('.popup_image-full');
const windowDelete = document.querySelector('.delete-popup');
  
export const buttonEdit = page.querySelector('.profile__edit-button');
export const buttonAdd = page.querySelector('.profile__add-button');
export const profileName = page.querySelector('.profile__name');
export const profileDescription = page.querySelector('.profile__description');
export const profilePhoto = page.querySelector('.profile__photo');
  
export const popupEdit = formEditProfile.querySelector('.popup');
export const nameInputEdit = formEditProfile.querySelector('.popup__input_type_name');
export const jobInputEdit = formEditProfile.querySelector('.popup__input_type_description');
  
export const popupAdd = formAddCard.querySelector('.popup');
export const nameInputAdd = formAddCard.querySelector('.popup__input_type_title');
export const srcInputAdd = formAddCard.querySelector('.popup__input_type_link');

export const popupDelete = windowDelete.querySelector('.popup');
export const buttonDelete = windowDelete.querySelector('.popup__save');
  
export const popupImage = imageFull.querySelector('.popup');
  
export const validationConfig = {
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

export const popupImageObject = new PopupWithImage(imageFull);
popupImageObject.setEventListeners();

//открыть картинку
export function openImage ({link, name}) {
  popupImageObject.open(name, link);
}

//создание карточки
// export function createCard(element, userId, openDeleteWindow) {
//   const elementCard = new Card(element, '#element', {openDeleteWindow}, {openImage});
//   elementCard.checkId(userId);
//   elementCard.deleteCard();
//   const cardTemplate = elementCard.generateCard();

//   return cardTemplate;
// }