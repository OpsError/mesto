import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);

        this._image = this._popupSelector.querySelector('.popup__image');
        this._figcaption = this._popupSelector.querySelector('.popup__figcaption');
    }

    open(name, link) {
        this._image.src = link;
        this._image.alt = name;
        this._figcaption.textContent = name;
        super.setEventListeners();
        super.open();
    }
}