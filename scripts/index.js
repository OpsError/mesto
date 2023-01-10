const page = document.querySelector('.page');

const popupList = page.querySelectorAll('.popup');

const formEditProfile = page.querySelector('.form-edit');
const formAddCard = page.querySelector('.form-add');
const imageFull = page.querySelector('.image-full');

const buttonEdit = page.querySelector('.profile__edit-button');
const buttonAdd = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const popupEdit = formEditProfile.querySelector('.popup');
const nameInputEdit = formEditProfile.querySelector('.popup__input_type_name');
const jobInputEdit = formEditProfile.querySelector('.popup__input_type_description');
const buttonCloseEditForm = formEditProfile.querySelector('.popup__close');

const popupAdd = formAddCard.querySelector('.popup');
const nameInputAdd = formAddCard.querySelector('.popup__input_type_title');
const srcInputAdd = formAddCard.querySelector('.popup__input_type_link');
const buttonCloseAddForm = formAddCard.querySelector('.popup__close');

const popupImage = imageFull.querySelector('.popup');
const imageFigure = imageFull.querySelector('.popup__image-container');
const imageFullFromCard = popupImage.querySelector('.popup__image');
const buttonCloseImagePopup = imageFull.querySelector('.popup__close');
const imageDescription = imageFigure.querySelector('.popup__figcaption');

const elementTemplate = page.querySelector('#element').content.querySelector('.element');
const elementsSection = page.querySelector('.elements');

// ===================================================================================================

//обработчик карточек
function handleSubmitFormAddCard(evt){
  evt.preventDefault();
  const name = nameInputAdd.value;
  const link = srcInputAdd.value;

  // createCard({name, link});
  const cardWithInputData = createCard({name, link});
  renderCard(cardWithInputData);

  closePopup(popupAdd);
}

//создание карточки
function createCard(cardData){
    const elementCard = elementTemplate.cloneNode(true);
    const buttonLike = elementCard.querySelector('.element__like');
    const buttonTrash = elementCard.querySelector('.element__trash');
    const elementPhoto = elementCard.querySelector('.element__photo');
    const iconButtonLike = elementCard.querySelector('.element__like-icon');

    elementPhoto.src = cardData.link;
    elementPhoto.alt = cardData.name;
    elementCard.querySelector('.element__description').textContent = cardData.name;

    // лайк
    buttonLike.addEventListener('click', () => {
      iconButtonLike.classList.toggle('element__like-icon_active');
    });

    // удалить
    buttonTrash.addEventListener('click', () => {
      elementCard.remove();
    });

    // открыть картинку на весь экран
    elementPhoto.addEventListener('click', () => {
      openPopup(popupImage);
      imageFullFromCard.src = cardData.link;
      imageFullFromCard.alt = cardData.name;
      imageDescription.textContent = cardData.name;
    });

    return elementCard;
}

//добавление карточки на страницу
function renderCard(elementCard){
  elementsSection.prepend(elementCard);
}

//закрыть попап на esc
const closePopupEscape = (evt, popupClass) => {
  if (evt.key === 'Escape'){
    closePopup(popupClass);
  }
}

//закрыть попап нажатием на оверлей
popupList.forEach((popup) => {
  popup.addEventListener('mouseup', (evt) => {
    const targetClassList = evt.target.classList;
    if (targetClassList.contains('popup') || (targetClassList.contains('popup__close'))) {
      closePopup(popup);
    }
  });
});

//открыть попап
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closePopupEscape(evt, popup));
}

//закрыть попап
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

//изменить имя/описание
function handleSubmitFormEditProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = jobInputEdit.value;
    closePopup(popupEdit);
}

//добавление карточек из массива
initialCards.forEach(card => {
  let initialCard = createCard(card);
  renderCard(initialCard);
});

// ========================================================================================================

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  nameInputAdd.value = '';
  srcInputAdd.value = '';
  enableValidation();
});

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
  enableValidation();
});

formEditProfile.querySelector('.popup__form').addEventListener('submit', handleSubmitFormEditProfile);

formAddCard.querySelector('.popup__form').addEventListener('submit', handleSubmitFormAddCard);

buttonCloseEditForm.addEventListener('click', () => {
  closePopup(popupEdit);
});

buttonCloseImagePopup.addEventListener('click', () => {
  closePopup(popupImage);
});

buttonCloseAddForm.addEventListener('click', () => {
  closePopup(popupAdd);
});