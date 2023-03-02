import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';

import { validationConfig, formAddCard, formEditProfile, popupAdd, popupEdit, buttonAdd, buttonEdit, nameInputAdd, nameInputEdit, srcInputAdd, jobInputEdit,
profileName, profileDescription, profilePhoto, popupDelete, openImage} from '../utils/utils.js';
// import { createCard } from '../utils/utils.js';

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

const infoUser = new UserInfo({
    title: profileName,
    about: profileDescription
});

let userId;
let cardElement;
//получение информации пользователя и карточек с сервера
Promise.all([api.getInfo(), api.getCard()])
  .then((res) => {
    const userData = res[0];
    const cardsData = res[1];
    
    userId = userData._id;
    cardElement = cardsData;

    infoUser.setUserInfo({
        name: userData.name,
        about: userData.about
    });
    infoUser.setAvatar(userData.avatar);

    cardRender.renderItems(cardsData);
  });

//добавление новой карточки
const popupAddCard = new PopupWithForm(popupAdd, ({name, link}) => {
    api.postCard({name, link})
        .then ((res) => {
            renderCard(res);
            console.log(res);
            popupAddCard.close();
        });
});
popupAddCard.setEventListeners();

//функция поставить/удалить лайк
function putLike (card, cardId) {
 if (card.checkLike()) {
    console.log(card.checkLike());
    api.deleteLike(cardId)
        .then ((res) => {
            card.getLikes(res.likes);
            card.toggleLike();
        });
 } else {
    console.log(card.checkLike());
    api.putLike(cardId)
        .then ((res) => {
            card.getLikes(res.likes);
            card.toggleLike();
        });
 }
}

// функция рендера карточек
function renderCard (element) {
    const card = new Card(element, '#element', userId, {openDeleteWindow}, openImage, handleLikeCard);
    card.checkId(userId);
    card.deleteWindow();

    function handleLikeCard () {
        putLike(card, element._id);
    }

    // удаление карточки с сервера
    const openDeletePopup = new PopupDelete(popupDelete, () => {
        api.deleteCard(element._id)
            .then (() => {
                card.deleteCard();
                openDeletePopup.close();
            });
    });

    // ф-ция открытия попапа и навешивание слушателей
    function openDeleteWindow() {
        openDeletePopup.open();
        openDeletePopup.setEventListeners();
    }

    const cardElement = card.generateCard();
    cardRender.addItem(cardElement);
}

// рендер карточек
const cardRender = new Section( renderCard, '.elements');

// изменить имя и описание профиля
const popupEditProfile = new PopupWithForm(popupEdit, ({name, link}) => {
    api.patchInfo({name, link})
        .then ((res) => {
            console.log(res);
            infoUser.setUserInfo({
                name: res.name,
                about: res.about
            });
            popupEditProfile.close();
        });
});

popupEditProfile.setEventListeners();

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