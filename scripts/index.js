let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-button');
let popup = page.querySelector('.popup');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');
let nameInput = page.querySelector('.popup__input_type_name');
let jobInput = page.querySelector('.popup__input_type_description');

let closeButton = page.querySelector('.popup__close');

let formElement = page.querySelector('.popup__form');

//открыть popup
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

//закрыть popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

//изменить имя/описание
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', showPopup);