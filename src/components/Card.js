export default class Card {
    constructor(data, templateSelector, userId, {openDeleteWindow}, openImage, handleLikeCard) {
        this._data = data;
        this._arrayLikes = data.likes;
        this._templateSelector = templateSelector;
        this._openImage = openImage;
        this._element = this._getTemplate();
        this._openDeleteWindow = openDeleteWindow;
        this._userId = userId;
        this._handleLikeCard = handleLikeCard;

        this._elementPhoto = this._element.querySelector('.element__photo');
        this._countLikes = this._element.querySelector('.element__like-number');
        this._buttonTrash = this._element.querySelector('.element__trash');
        this._iconButtonLike = this._element.querySelector('.element__like-icon');
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

        //лайк
        buttonLike.addEventListener('click', () => {
            this._handleLikeCard();
        });

        //открыть окно удаления
        this._buttonTrash.addEventListener('click', () => {
            this._openDeleteWindow(this._element._element, this._data._id);
        });

        //открыть фотографию
        this._elementPhoto.addEventListener('click', () => {
            this._openImage({link: this._data.link, name: this._data.name});
        });
        
    }

    getLikes (arr) {
        this._countLikes.textContent = arr.length;
    }

    toggleLike() {
        this._iconButtonLike.classList.toggle('element__like-icon_active');
    }

    checkLike () {
        return this._arrayLikes.some(item => item._id === this._userId);
    }

    deleteWindow() {
        this._buttonTrash.addEventListener('click', () => {
            this._openDeleteWindow(this, this._data._id);
        });
    }

    deleteCard() {
        console.log(this._element);
        this._element.remove();
        this._element = null;
    }

    checkId(userId) {
        if (this._data.owner._id !== userId) {
            this._buttonTrash.classList.add('element__trash_blocked');
        }
    }

    //устанавливает карточке название, картинку и описание
    generateCard() {
        this._elementPhoto.src = this._data.link;
        this._elementPhoto.alt = this._data.name;
        this._element.querySelector('.element__description').textContent = this._data.name;
        this.getLikes(this._arrayLikes);
        if (this.checkLike()) {
            this.toggleLike();
        }

        this._setEventListeners();

        return this._element;
    }
}