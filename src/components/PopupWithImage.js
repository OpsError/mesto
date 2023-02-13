import {imageFullFromCard, imageDescription} from '../utils/utils.js';

class PopupWithImage extends Popup {
    constructor(popup, data) {
        super(popup);
        this._data = data;
    }

    open() {
        imageFullFromCard.src = this._data.link;
        imageFullFromCard.alt = this._data.name;
        imageDescription.textContent = this._data.name;
        super.open();
    }
}