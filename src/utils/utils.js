import PopupWithImage from "../components/PopupWithImage.js";
  
const page = document.querySelector('.page');
  
export const formEditProfile = page.querySelector('.form-edit');
export const formAddCard = page.querySelector('.form-add');
export const imageFull = page.querySelector('.popup_image-full');
const windowDelete = page.querySelector('.delete-popup');
export const formPatchAvatar = page.querySelector('.patch-avatar')
  
export const buttonEdit = page.querySelector('.profile__edit-button');
export const buttonAdd = page.querySelector('.profile__add-button');
export const buttonAvatar = page.querySelector('.profile__edit-avatar');
export const profileName = page.querySelector('.profile__name');
export const profileDescription = page.querySelector('.profile__description');
export const profilePhoto = page.querySelector('.profile__photo');
  
export const popupEdit = formEditProfile.querySelector('.popup');
export const nameInputEdit = formEditProfile.querySelector('.popup__input_type_name');
export const jobInputEdit = formEditProfile.querySelector('.popup__input_type_description');
export const buttonSubmitProfile = formEditProfile.querySelector('.popup__save');

export const popupEditAvatar = formPatchAvatar.querySelector('.popup');
export const avatarInputEdit = formPatchAvatar.querySelector('.popup__input_type_url');
export const buttonSubmitAvatar = formPatchAvatar.querySelector('.popup__save');
  
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