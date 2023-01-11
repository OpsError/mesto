//показать ошибку ввода
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  
  //скрыть ошибку ввода
  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
  
  //проверка формы на валидность
  const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) { //если есть ошибка
      console.log(inputElement.validationMessage);
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  //проверка каждого поля на ошибку в поле ввода
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  //сделать кнопку неактивной(активной) при ошибке(правильном вводе)
  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  //установить слушатели на каждую форму
  const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    //проверить кнопку при открытии формы
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement, config);
        //проверять кнопку при вводе каждого символа
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  }
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      
      const fieldsetList = Array.from(formElement.querySelectorAll(config.fieldsetSelector));
      fieldsetList.forEach((fieldSet) => {
        setEventListeners(fieldSet, config);
      });
    });
  }