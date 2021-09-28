
export class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

 _showInputError (inputElement, errorMessage){
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._data.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._data.errorClass);
};

_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._data.inputErrorClass);
  errorElement.classList.remove(this._data.errorClass);
  errorElement.textContent = '';
};

_checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Проверяем, все ли поля валидны 
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

_toggleButtonState(inputList, buttonElement){
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._data.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(this._data.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 

_setEventListeners(){
    const inputList = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    const buttonElement = this._formElement.querySelector(this._data.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement); 
      });
    });
}


  enableValidation() {
    this._setEventListeners();
  }
}


