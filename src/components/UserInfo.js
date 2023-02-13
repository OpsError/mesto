

export default class UserInfo {
    constructor({title, description}) {
        this._title = title;
        this._description = description;

        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
    }

    //собирает данные со страницы
    getUserInfo() {
        const formTitle = this._title.textContent;
        const formDescription = this._description.textContent;
        return {name: formTitle, description: formDescription};
    }

    //устанавливает новое имя и описание
    setUserInfo(name, description) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }
}