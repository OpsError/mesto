export default class FormValidator {
    constructor (config, formElement) {
        this._formElement = formElement;
        this._config = config;
    }

    _showInputError = (formElement, inputElement, errorMessage) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
      }
      
      //скрыть ошибку ввода
    _hideInputError = (formElement, inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
      }
      
      //проверка формы на валидность
    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) { //если есть ошибка
          console.log(inputElement.validationMessage);
          this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(formElement, inputElement);
        }
      }
      
      //проверка каждого поля на ошибку в поле ввода
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }
      
      //сделать кнопку неактивной(активной) при ошибке(правильном вводе)
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
          buttonElement.classList.add(this._config.inactiveButtonClass);
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove(this._config.inactiveButtonClass);
          buttonElement.disabled = false;
        }
      }
      
      //установить слушатели на каждую форму
    _setEventListeners (formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        
        const buttonElement = formElement.querySelector(this._config.submitButtonSelector);
        //проверить кнопку при открытии формы
        this._toggleButtonState(inputList, buttonElement);
      
        inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', ()=> {
            this._checkInputValidity(formElement, inputElement);
            //проверять кнопку при вводе каждого символа
            this._toggleButtonState(inputList, buttonElement);
          });
        });
      }

    //заблокировать кнопку при открытии попапа
    blockButtonSave(popup) {
        const buttonClass = popup.querySelector('.popup__save');
        buttonClass.classList.add('popup__save_inactive');
        buttonClass.disabled = true;
    }
      
    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this._formElement));
        formList.forEach((formElement) => {
          formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
          });
          
          const fieldsetList = Array.from(formElement.querySelectorAll(this._config.fieldsetSelector));
          fieldsetList.forEach((fieldSet) => {
            console.log(fieldSet);
            this._setEventListeners(fieldSet);
          });
        });
    }

}