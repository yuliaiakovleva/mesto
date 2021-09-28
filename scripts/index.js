import { Card } from './card.js';
import { editButton, popupProfile, closeButton, popupProfileName, popupProfileInfo, inputName, inputInfo, inputCardName, inputCardLink, formContainer, popupCard, addButton, closeCardButton, popupProfileForm, popupAddCardForm, initialCards, cardList } from './constants.js';

// !Открытие и закрытие модального окна 
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupWithEsc);
};

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

// Закрытие попапа(модального окна) нажатием на esc
const closePopupWithEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  };
};


// !Создание карточек 

// рендерю карточку (функция создания карточки)
function renderCard(item) {
  const card = new Card (item, '#card-template');
  const cardElement = card.generateCard();
  cardList.append(cardElement);
}

// добавляю 6 карточек на страницу
initialCards.forEach(item => renderCard(item)); 



// !Изменение информации профиля

editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfileName.value = inputName.textContent;
  popupProfileInfo.value = inputInfo.textContent;
});
closeButton.addEventListener('click', () => closePopup(popupProfile));

function formSubmitHandler(evt) {
  evt.preventDefault();
  inputName.textContent = popupProfileName.value;
  inputInfo.textContent = popupProfileInfo.value;
  closePopup(popupProfile);
}

// сохранение изменений информации профиля 
formContainer.addEventListener('submit', formSubmitHandler);


// открываю и закрываю попап с добавлением карточки
addButton.addEventListener('click', () => openPopup(popupCard));
closeCardButton.addEventListener('click', () => closePopup(popupCard));


// Добавляю карточки через попап 
function popupCardSubmitHandler(evt) {
  evt.preventDefault();

  const cardObject = {};
  cardObject.title = inputCardName.value;
  cardObject.link = inputCardLink.value;

  renderCard(cardObject);

  // сбрасываю значения полей, чтобы прии повторном открытии они были пустые 
  popupAddCardForm.reset();

  // сбрасываю значение кнопки 
  resetButton(popupCard);

  // закрываю попап
  closePopup(popupCard);
};

popupAddCardForm.addEventListener('submit', popupCardSubmitHandler);

// Закрытие попапа кликом на оверлей 
const popupOverlay = document.querySelectorAll('.popup');

popupOverlay.forEach(item => {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  });
});


// обнуляю кнопку сабмита 
function resetButton(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const submitButton = form.querySelector('.popup__button');
  submitButton.classList.add('popup__button_disabled');
  submitButton.setAttribute('disabled', true);
};

// Все о валидации


import { FormValidator } from './validate.js';
import { validationData } from './constants.js';

const popupProfileValidate = new FormValidator(validationData, popupProfileForm);
popupProfileValidate.enableValidation();


const popupAddCardValidate = new FormValidator(validationData, popupAddCardForm);
popupAddCardValidate.enableValidation();




