import {openPopup, popupImage, imageFullFromCard, imageDescription} from "./ImageData.js";

export default class Card {
    constructor(data, templateSelector) {
        this._data = data;
        this._templateSelector = templateSelector;
    }

    //возвращает селектор шаблона
    _getTemplate() {
       const cardElement = document
       .querySelector(this._templateSelector)
       .content
       .querySelector('.element')
       .cloneNode(true);

       return cardElement;
    }

    //установщик событий
    _setEventListeners() {
        this._element = this._getTemplate();
        const buttonLike = this._element.querySelector('.element__like');
        const buttonTrash = this._element.querySelector('.element__trash');
        const iconButtonLike = this._element.querySelector('.element__like-icon');
        const elementPhoto = this._element.querySelector('.element__photo');

        //лайк
        buttonLike.addEventListener('click', () => {
            iconButtonLike.classList.toggle('element__like-icon_active');
        });

        //удалить
        buttonTrash.addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });

        //открыть картинку на весь экран
        elementPhoto.addEventListener('click', () => {
            imageFullFromCard.src = this._data.link;
            imageFullFromCard.alt = this._data.name;
            imageDescription.textContent = this._data.name;
            openPopup(popupImage);
        });
    }

    //устанавливает карточке название, картинку и описание
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = this._data.link;
        elementPhoto.alt = this._data.name;
        this._element.querySelector('.element__description').textContent = this._data.name;

        return this._element;
    }
}