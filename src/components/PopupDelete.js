import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (popup) {
        super(popup);
        this._formDelete = popup.querySelector('.popup__form');
    }

    setHandleSubmitFormDelete(handleSubmitFormDelete) {
        this._handleSubmitFormDelete = handleSubmitFormDelete;
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