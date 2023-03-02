import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (popup, handleSubmitFormDelete) {
        super(popup);
        // this._element = element;
        this._handleSubmitFormDelete = handleSubmitFormDelete;
        this._formDelete = popup.querySelector('.popup__form');
    }

    //слушатели
    setEventListeners() {
        this._formDelete.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitFormDelete();
        });
        super.setEventListeners();
    }

    // deleteCardTemplation() {
    //     this._element._element.remove();
    //     this._element._element = null;
    //     super.close();
    // }
}