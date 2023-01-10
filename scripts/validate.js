//показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
  }
  
  //скрыть ошибку ввода
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  }
  
  //проверка формы на валидность
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) { //если есть ошибка
      console.log(inputElement.validationMessage);
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  //проверка каждого поля на ошибку в поле ввода
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  //сделать кнопку неактивной(активной) при ошибке(правильном вводе)
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save_inactive');
    } else {
      buttonElement.classList.remove('popup__save_inactive');
    }
  }
  
  //установить слушатели на каждую форму
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    
    const buttonElement = formElement.querySelector('.popup__save');
    //проверить кнопку при открытии формы
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
        //проверять кнопку при вводе каждого символа
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form-set'));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet);
      });
    });
  }