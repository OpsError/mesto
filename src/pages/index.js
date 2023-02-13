import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';

import { initialCards, validationConfig, formAddCard, formEditProfile, popupAdd, popupEdit, buttonAdd, buttonEdit, nameInputAdd, nameInputEdit, srcInputAdd, jobInputEdit,
profileName, profileDescription} from '../utils/utils.js';
import { openImage } from '../utils/utils.js';

// Валидация
const formAddValidation = new FormValidator(validationConfig, formAddCard.querySelector('.popup__form'));
const formEditValidation = new FormValidator(validationConfig, formEditProfile.querySelector('.popup__form'));
formAddValidation.enableValidation();
formEditValidation.enableValidation();

const popupAddCard = new PopupWithForm(popupAdd, ({name, description}) => {
    const elementCard = new Card({name, description}, '#element', {openImage});
    const cardTemplate = elementCard.generateCard();
    const card = new Section({
        items: {name, description},
        renderer: () => {}
    }, '.elements');
    card.addItem(cardTemplate);

    popupAddCard.close();
});
popupAddCard.setEventListeners();

const infoUser = new UserInfo({
    title: profileName,
    description: profileDescription
});

const popupEditProfile = new PopupWithForm(popupEdit, ({name, description}) => {
    infoUser.setUserInfo(name, description);
    popupEditProfile.close();
});

popupEditProfile.setEventListeners();


//Отрисовка дефолтных карточек
const card = new Section({
    items: initialCards,
    renderer: (element) => {
        const elementCard = new Card(element, '#element', {openImage});
        const cardTemplate = elementCard.generateCard();
        card.addItem(cardTemplate);
    }
}, '.elements');
card.renderItems();

//слушатель кнопки добавить
buttonAdd.addEventListener('click', () => {
    popupAddCard.open();
    nameInputAdd.value = '';
    srcInputAdd.value = '';
    formAddValidation.blockButtonSave(popupAdd);
});

//слушатель кнопки редактирования
buttonEdit.addEventListener('click', () => {
    const infoFromPage = infoUser.getUserInfo();
    nameInputEdit.value = infoFromPage.name;
    jobInputEdit.value = infoFromPage.description;
    popupEditProfile.open();
});