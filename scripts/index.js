const page = document.querySelector('.page');

const formEdit = page.querySelector('.form-edit');
const formAdd = page.querySelector('.form-add');
const imageFull = page.querySelector('.image-full');

const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const profileName = page.querySelector('.profile__name');
const profileDescription = page.querySelector('.profile__description');

const nameInputEdit = formEdit.querySelector('.popup__input_type_name');
const jobInputEdit = formEdit.querySelector('.popup__input_type_description');
const nameInputAdd = formAdd.querySelector('.popup__input_type_name');
const srcInputAdd = formAdd.querySelector('.popup__input_type_description');

const imagePopup = imageFull.querySelector('.popup');
const imageFigure = imageFull.querySelector('.popup__image-container');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  // ===================================================================================================

  // Добавление элемента в начало массива
  function addToArray(evt){
    evt.preventDefault();
    let name = nameInputAdd.value;
    let link = srcInputAdd.value;

    initialCards.push({name, link});
    addToPage(name, link);

    togglePopup(formAdd.querySelector('.popup'));
  }

//Добавление картинки на страницу
function addToPage(name, link){
    const elementTemplate = page.querySelector('#element').content;
    const elementsSection = page.querySelector('.elements');
    const elementCard = elementTemplate.querySelector('.element').cloneNode(true);
    const likeButton = elementCard.querySelector('.element__like');
    const trashButton = elementCard.querySelector('.element__trash');
    const elementPhoto = elementCard.querySelector('.element__photo');

    elementCard.querySelector('.element__photo').src = link;
    elementCard.querySelector('.element__photo').alt = name;
    elementCard.querySelector('.element__description').textContent = name;

    // лайк
    likeButton.addEventListener('click', () => {
      elementCard.querySelector('.element__like-icon').classList.toggle('element__like-icon_active');
    });

    // удалить
    trashButton.addEventListener('click', () => {
      deleteCard(name);
      elementCard.remove();
    });

    // открыть картинку на весь экран
    elementPhoto.addEventListener('click', () => {
      togglePopup(imagePopup);
      imageFigure.querySelector('.popup__image').src = link;
      imageFigure.querySelector('.popup__image').alt = name;
      imageFigure.querySelector('.popup__figcaption').textContent = name;
    });

    elementsSection.prepend(elementCard);
}

// открыть(закрыть) попап
function togglePopup(classPopup){
  classPopup.classList.toggle('popup_opened');
}

//изменить имя/описание
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInputEdit.value;
    profileDescription.textContent = jobInputEdit.value;
    togglePopup(formEdit.querySelector('.popup'));
}

for (let i = 0; i < initialCards.length; i++){
  addToPage(initialCards[i].name, initialCards[i].link);
}

function deleteCard(name){
  let posInitialCard = initialCards.map(e => e.name).indexOf(name);
  initialCards.splice(posInitialCard, 1);
}

// ========================================================================================================

addButton.addEventListener('click', () => {
  togglePopup(formAdd.querySelector('.popup'));
  nameInputAdd.value = '';
  srcInputAdd.value = '';
});

editButton.addEventListener('click', () => {
  togglePopup(formEdit.querySelector('.popup'));
  nameInputEdit.value = profileName.textContent;
  jobInputEdit.value = profileDescription.textContent;
});


formEdit.querySelector('.popup__form').addEventListener('submit', handleFormSubmit);

formAdd.querySelector('.popup__form').addEventListener('submit', addToArray);


formEdit.querySelector('.popup__close').addEventListener('click', () => {
  togglePopup(formEdit.querySelector('.popup'));
});

imagePopup.querySelector('.popup__close').addEventListener('click', () => {
  togglePopup(imagePopup);
});

formAdd.querySelector('.popup__close').addEventListener('click', () => {
  togglePopup(formAdd.querySelector('.popup'));
});