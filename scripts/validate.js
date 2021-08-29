
const showInputError = (formElement, inputElement, errorMessage, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationData.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationData.errorClass);
};

const hideInputError = (formElement, inputElement, validationData) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationData.inputErrorClass);
  errorElement.classList.remove(validationData.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationData) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationData);
  } else {
    hideInputError(formElement, inputElement, validationData);
  }
};

// Проверяем, все ли поля валидны 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Переключаем кнопку в зависимости от ответа функции hasInvalidInput
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 

const setEventListeners = (formElement, validationData) => {
  const inputList = Array.from(formElement.querySelectorAll(validationData.inputSelector));
  const buttonElement = formElement.querySelector(validationData.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationData);
      toggleButtonState(inputList, buttonElement, validationData.inactiveButtonClass); 
    });
  });
};


const enableValidation = (validationData) => {
  const formList = Array.from(document.querySelectorAll(validationData.formSelector));
  formList.forEach((formElement) => { 
    // formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault(); 
    // });
     setEventListeners(formElement, validationData);
 });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});