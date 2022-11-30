let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popup = main.querySelector('.popup');
editButton.addEventListener('click', showPopup);

//открыть popup
function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value', profileDescription.textContent);
}

let closeButton = main.querySelector('.popup__close');
closeButton.addEventListener('click', closePopup);

//закрыть popup
function closePopup() {
    popup.classList.remove('popup_opened');
}

let formElement = main.querySelector('.popup__form');
let nameInput = main.querySelector('.popup__name');
let jobInput = main.querySelector('.popup__description');
let profileName = main.querySelector('.profile__name');
let profileDescription = main.querySelector('.profile__description');

//обработчик
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 