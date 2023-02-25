import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import { validationConfig, formAddCard, formEditProfile, popupAdd, popupEdit, buttonAdd, buttonEdit, nameInputAdd, nameInputEdit, srcInputAdd, jobInputEdit,
profileName, profileDescription, profilePhoto} from '../utils/utils.js';
import { openImage, createCard } from '../utils/utils.js';

// Валидация
const formAddValidation = new FormValidator(validationConfig, formAddCard.querySelector('.popup__form'));
const formEditValidation = new FormValidator(validationConfig, formEditProfile.querySelector('.popup__form'));
formAddValidation.enableValidation();
formEditValidation.enableValidation();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '11c262d9-4172-458c-924e-d3009da526d4',
        'Content-type': 'application/json'
    }
});

//при загрузке страницы имя и описание с сервера
api.getInfo()
    .then ((res) => {
        profileName.textContent = res.name;
        profileDescription.textContent = res.about;
        profilePhoto.src = res.avatar;
        console.log(res);
    });

//потом
const popupAddCard = new PopupWithForm(popupAdd, ({name, link}) => {
    api.postCard({name, link})
        .then ((res) => {
            const cardTemplate = createCard(res);
            console.log(cardTemplate);
            const card = new Section({
                items: res,
                renderer:  (element) => {
                    const cardTemplate = createCard(element);
                    card.addItem(cardTemplate);
                }
            }, '.elements');
            card.addItem(cardTemplate);

            popupAddCard.close();
        });
});
popupAddCard.setEventListeners();

const infoUser = new UserInfo({
    title: profileName,
    about: profileDescription
});


const popupEditProfile = new PopupWithForm(popupEdit, ({name, link}) => {
    api.patchInfo({name, link})
        .then ((res) => {
            console.log(res);
            infoUser.setUserInfo(res.name, res.about);
            popupEditProfile.close();
        });
});

popupEditProfile.setEventListeners();


//Отрисовка дефолтных карточек
api.getCard()
    .then ((res) => {
        const card = new Section({
            items: res,
            renderer:  (element) => {
                const cardTemplate = createCard(element);
                card.addItem(cardTemplate);
            }
        }, '.elements');
        card.renderItems();
    });

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
    jobInputEdit.value = infoFromPage.about;
    popupEditProfile.open();
});