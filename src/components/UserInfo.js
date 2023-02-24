

export default class UserInfo {
    constructor({title, about}) {
        this._title = title;
        this._about = about;

        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
    }

    //собирает данные со страницы
    getUserInfo() {
        const formTitle = this._title.textContent;
        const formDescription = this._about.textContent;
        return {name: formTitle, about: formDescription};
    }

    //устанавливает новое имя и описание
    setUserInfo(name, about) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = about;
    }
}