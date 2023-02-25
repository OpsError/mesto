export default class Card {
    constructor(data, templateSelector, {openImage}) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
        this._element = this._getTemplate();
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._countLikes = this._element.querySelector('.element__like-number');
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
        const buttonLike = this._element.querySelector('.element__like');
        const buttonTrash = this._element.querySelector('.element__trash');
        const iconButtonLike = this._element.querySelector('.element__like-icon');

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
        this._elementPhoto.addEventListener('click', () => {
            this._openImage({link: this._data.link, name: this._data.name});
        });
        
    }

    //устанавливает карточке название, картинку и описание
    generateCard() {
        this._elementPhoto.src = this._data.link;
        this._elementPhoto.alt = this._data.name;
        this._element.querySelector('.element__description').textContent = this._data.name;
        this._countLikes.textContent = this._data.likes.length + 1;
        this._setEventListeners();

        return this._element;
    }
}