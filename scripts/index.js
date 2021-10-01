import { Card } from './Сard.js';
import { closeImageButton, popupImage, editButton, popupProfile, closeProfileButton, popupProfileName, popupProfileInfo, inputName, inputInfo, inputCardName, inputCardLink, formContainer, popupCard, addButton, closeCardButton, popupProfileForm, popupAddCardForm, initialCards, cardList } from './constants.js';
import { FormValidator } from './FormValidator.js';
import { validationData } from './constants.js';

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

// Закрытие карточек 
closeImageButton.addEventListener('click', () => {
        closePopup(popupImage);
      });


// !Создание карточек 

// создаю карточки
function createCard(item) {
  const card = new Card (item, '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
} 


// добавляю заготовку карточки в разметку 
function renderCard(item) { 
  const newCard = createCard(item);   
  cardList.prepend(newCard); 
  }; 


// добавляю 6 карточек на страницу
initialCards.forEach(item => renderCard(item)); 


// ! Все о валидации

const popupProfileValidate = new FormValidator(validationData, popupProfileForm);
popupProfileValidate.enableValidation();

const popupAddCardValidate = new FormValidator(validationData, popupAddCardForm);
popupAddCardValidate.enableValidation();



//! Открываем попап с информацией профиля 
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfileName.value = inputName.textContent;
  popupProfileInfo.value = inputInfo.textContent;
});

closeProfileButton.addEventListener('click', () => closePopup(popupProfile));

// Изменение информации профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  inputName.textContent = popupProfileName.value;
  inputInfo.textContent = popupProfileInfo.value;
  closePopup(popupProfile);
}


// сохранение изменений информации профиля 
formContainer.addEventListener('submit', handleFormSubmit);


// открываю и закрываю попап с добавлением карточки
addButton.addEventListener('click', () =>  {
    openPopup(popupCard);
    popupAddCardValidate.resetForm();
});


closeCardButton.addEventListener('click', () => closePopup(popupCard));


// Добавляю карточки через попап 
function handleAddCard(evt) {
  evt.preventDefault();

  const cardObject = {};
  cardObject.title = inputCardName.value;
  cardObject.link = inputCardLink.value;

  renderCard(cardObject);

  // сбрасываю значения полей, чтобы прии повторном открытии они были пустые 
  // popupAddCardForm.reset()

  // // cбрасываю значение кнопки 
  // popupAddCardValidate.toggleButtonState()

  // закрываю попап
  closePopup(popupCard);
};

popupAddCardForm.addEventListener('submit', handleAddCard);

// Закрытие попапа кликом на оверлей 
const popupOverlay = document.querySelectorAll('.popup');

popupOverlay.forEach(item => {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  });
});

