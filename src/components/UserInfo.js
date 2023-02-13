

export default class UserInfo {
    constructor({title, description}) {
        this._title = title;
        this._description = description;
    }

    //собирает данные со страницы
    getUserInfo() {
        const formTitle = this._title.textContent;
        const formDescription = this._description.textContent;
        return {name: formTitle, description: formDescription};
    }

    //устанавливает новое имя и описание
    setUserInfo(name, description) {
        const profileName = document.querySelector('.profile__name');
        const profileDescription = document.querySelector('.profile__description');
        profileName.textContent = name;
        profileDescription.textContent = description;
    }
}