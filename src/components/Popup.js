export default class Popup {
    constructor(popup) {
        this._popupSelector = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('mousedown', this._handleOverlayClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon'))) {
            this.close();
        }
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', this._handleOverlayClose);
    }
}