import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popup, handleSubmitForm) {
        super(popup);
        this._handleSubmitForm = handleSubmitForm;

        this._form = popup.querySelector('.popup__form');
        this._inputList = popup.querySelectorAll('.popup__input');
    }

    //собирает данные с полей
    _getInputValues () {
        this._inputValueList = {};
        this._inputList.forEach((item) => {
            this._inputValueList[item.name] = item.value;
        });

        return this._inputValueList;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._list = this._getInputValues();
            this._handleSubmitForm({
                name: this._list.title,
                link: this._list.about});
        });
        super.setEventListeners();
    }

    close() {
        super.close();
        this._form.reset();
    }
}