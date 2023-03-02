export default class UserInfo {
    constructor(data) {
        this._title = data.title;
        this._about = data.about;

        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
        this._profilePhoto = document.querySelector('.profile__photo');
    }

    //собирает данные со страницы
    getUserInfo() {
        const formTitle = this._title.textContent;
        const formDescription = this._about.textContent;
        return {name: formTitle, about: formDescription};
    }

    //устанавливает новое имя и описание
    setUserInfo({name, about}) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = about;
    }

    setAvatar(avatar) {
        this._profilePhoto.src = avatar;
    }
}