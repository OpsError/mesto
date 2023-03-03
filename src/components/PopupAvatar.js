import Popup from "./Popup.js";

export default class PopupAvatar extends Popup {
    constructor (popup, handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;

        this._form = popup.querySelector('.popup__form');
        this._inputData = popup.querySelector('.popup__input');
    }

    _getInputValues() {
        return this._inputData.value;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._url = this._getInputValues();
            console.log(this._url);
            this._handleSubmitForm (this._url);
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._form.reset();
    }
}