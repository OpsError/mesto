import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";

export const initialCards = [
    {
      name: 'Манджиро Сано',
      description: 'https://i.pinimg.com/564x/a2/db/73/a2db73896e7d9785bc3ee3781c544fae.jpg'
    },
    {
      name: 'Сатору Годзё',
      description: 'https://i.pinimg.com/564x/bd/9e/0c/bd9e0c78a5af0557f6bfd5698d0747a2.jpg'
    },
    {
      name: 'Фуши',
      description: 'https://i.pinimg.com/564x/a8/62/a5/a862a55f111d580a2da65154d9760397.jpg'
    },
    {
      name: 'Эрен Йегер',
      description: 'https://i.pinimg.com/564x/f7/68/6d/f7686dfa04ad48af95497c9303b26471.jpg'
    },
    {
      name: 'Юдзи Итадори',
      description: 'https://i.pinimg.com/564x/09/ad/73/09ad73cc4ee3bb1905f9374ff79f5823.jpg'
    },
    {
      name: 'Кёдзиро Ренгоку',
      description: 'https://i.pinimg.com/564x/11/75/d1/1175d1bb70114306b7b31abeae11b69c.jpg'
    }
  ];
  
const page = document.querySelector('.page');
  
export const formEditProfile = page.querySelector('.form-edit');
export const formAddCard = page.querySelector('.form-add');
export const imageFull = document.querySelector('.popup_image-full');
  
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

export function createCard(element) {
  const elementCard = new Card(element, '#element', {openImage});
  const cardTemplate = elementCard.generateCard();

  return cardTemplate;
}