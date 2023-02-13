import {popupImage} from "../utils/utils.js";
import Popup  from "./Popup.js";

export default class Card {
    constructor(data, templateSelector, {openImage}) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
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

        //открыть фотографию
        elementPhoto.addEventListener('click', () => {
            this._openImage({link: this._data.description, name: this._data.name});
            const popupImageFull = new Popup(popupImage);
            popupImageFull.open();
            popupImageFull.setEventListeners();
        });
        
    }

    //устанавливает карточке название, картинку и описание
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        const elementPhoto = this._element.querySelector('.element__photo');
        elementPhoto.src = this._data.description;
        elementPhoto.alt = this._data.name;
        this._element.querySelector('.element__description').textContent = this._data.name;

        return this._element;
    }
}