import './index.css';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';
import PopupAvatar from '../components/PopupAvatar.js';

import { validationConfig, formAddCard, formEditProfile, formPatchAvatar, 
    popupAdd, popupEdit, popupEditAvatar, buttonAvatar, buttonAdd, buttonEdit, 
    nameInputAdd, nameInputEdit, srcInputAdd, jobInputEdit, profileName, 
    profileDescription, avatarInputEdit, popupDelete, openImage,
    buttonSubmitAvatar, buttonSubmitProfile} from '../utils/utils.js';

// Валидация
const formAddValidation = new FormValidator(validationConfig, formAddCard.querySelector('.popup__form'));
const formEditValidation = new FormValidator(validationConfig, formEditProfile.querySelector('.popup__form'));
const formEditAvatarValidation = new FormValidator(validationConfig, formPatchAvatar.querySelector('.popup__form'));
formAddValidation.enableValidation();
formEditValidation.enableValidation();
formEditAvatarValidation.enableValidation();

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
        })
        .catch ((res) => {
            console.log(res);
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
        })
        .catch ((res) => {
            console.log(res);
        });
 } else {
    console.log(card.checkLike());
    api.putLike(cardId)
        .then ((res) => {
            card.getLikes(res.likes);
            card.toggleLike();
        })
        .catch ((res) => {
            console.log(res);
        });
 }
}

const openDeletePopup = new PopupDelete(popupDelete);

// функция рендера карточек
function renderCard (element) {
    const card = new Card(element, '#element', userId, {openDeleteWindow}, openImage, handleLikeCard);
    card.checkId(userId);
    card.deleteWindow();

    function handleLikeCard (id) {
        putLike(card, id);
    }

    // удаление карточки с сервера
    openDeletePopup.setHandleSubmitFormDelete ((evt) => {
            evt.preventDefault();
            api.deleteCard(element._id)
                .then (() => {
                    card.deleteCard();
                    openDeletePopup.close();
                })
                .catch ((res) => {
                    console.log(res);
                });
        }
    );

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
    buttonSubmitProfile.textContent = 'Сохранение...';
    api.patchInfo({name, link})
        .then ((res) => {
            console.log(res);
            infoUser.setUserInfo({
                name: res.name,
                about: res.about
            });
            popupEditProfile.close();
        })
        .catch ((res) => {
            console.log(res);
        });
});

popupEditProfile.setEventListeners();

const popupAvatarEdit = new PopupAvatar(popupEditAvatar, (url) => {
    buttonSubmitAvatar.textContent = 'Сохранение...'
    api.patchAvatar(url)
        .then ((res) => {
            infoUser.setAvatar(res.avatar);
            popupAvatarEdit.close();
        })
        .catch ((res) => {
            console.log(res);
        });
});

//слушатель кнопки добавить
buttonAdd.addEventListener('click', () => {
    popupAddCard.open();
    formAddValidation.cleanErrorMessage(nameInputAdd);
    formAddValidation.cleanErrorMessage(srcInputAdd);
    nameInputAdd.value = '';
    srcInputAdd.value = '';
    formAddValidation.blockButtonSave();
});

//слушатель кнопки редактирования
buttonEdit.addEventListener('click', () => {
    const infoFromPage = infoUser.getUserInfo();
    nameInputEdit.value = infoFromPage.name;
    jobInputEdit.value = infoFromPage.about;
    formEditValidation.cleanErrorMessage(nameInputEdit);
    formEditValidation.cleanErrorMessage(jobInputEdit);
    buttonSubmitProfile.textContent = 'Сохранить';
    formEditValidation.blockButtonSave();
    popupEditProfile.open();
});

// слушатель кнопки изменить аватарку
buttonAvatar.addEventListener('click', () => {
    buttonSubmitAvatar.textContent = 'Сохранить';
    popupAvatarEdit.open();
    formEditAvatarValidation.cleanErrorMessage(avatarInputEdit);
    avatarInputEdit.value = '';
    popupAvatarEdit.setEventListeners();
    formEditAvatarValidation.blockButtonSave();
});