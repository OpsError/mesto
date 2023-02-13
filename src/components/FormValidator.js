export default class FormValidator {
    constructor (config, formElement) {
        this._formElement = formElement;
        this._config = config;
        this._inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = formElement.querySelector(this._config.submitButtonSelector);
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
      }
      
      //скрыть ошибку ввода
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
      }
      
      //проверка формы на валидность
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) { //если есть ошибка
          console.log(inputElement.validationMessage);
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
      }
      
      //проверка каждого поля на ошибку в поле ввода
    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
        });
      }
      
      //сделать кнопку неактивной(активной) при ошибке(правильном вводе)
    _toggleButtonState = () => {
        if (this._hasInvalidInput()) {
          this._buttonElement.classList.add(this._config.inactiveButtonClass);
          this._buttonElement.disabled = true;
        } else {
          this._buttonElement.classList.remove(this._config.inactiveButtonClass);
          this._buttonElement.disabled = false;
        }
      }
      
      //установить слушатели на каждую форму
    _setEventListeners () {
        //проверить кнопку при открытии формы
        this._toggleButtonState();
      
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', ()=> {
            this._checkInputValidity(inputElement);
            //проверять кнопку при вводе каждого символа
            this._toggleButtonState();
          });
        });
      }

    //заблокировать кнопку при открытии попапа
    blockButtonSave(popup) {
        this._buttonElement.classList.add('popup__save_inactive');
        this._buttonElement.disabled = true;
    }
      
    enableValidation() {
      this._setEventListeners();
    }

}