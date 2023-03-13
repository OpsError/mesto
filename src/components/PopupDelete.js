import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (popup, handleSubmitFormDelete) {
        super(popup);
        this._handleSubmitFormDelete = handleSubmitFormDelete;
        // this._cardId = cardId;
        this._formDelete = popup.querySelector('.popup__form');
        // this._formSubmit = popup.querySelector('.popup__form');
    }

    _deleteCard() {
        this._handleSubmitFormDelete();
    }

    //слушатели
    setEventListeners() {
        super.setEventListeners();
        this._formDelete.addEventListener('submit', this._handleSubmitFormDelete);
    }

    close() {
        super.close();
        this._formDelete.removeEventListener('submit', this._handleSubmitFormDelete);
    }
}