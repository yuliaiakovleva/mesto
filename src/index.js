
import './style/index.css';

import { Card } from './components/Сard.js';
import { initialCards, editButton, addButton, popupProfileName, popupProfileInfo, popupProfileForm, popupAddCardForm, cardListSection, validationData} from './utils/constants.js';
import { FormValidator } from './components/FormValidator.js';
import { Section } from './components/Section.js';
import { Popup } from './components/Popup.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js'


// функция создания карточки и добавления карточки на страницу 
function addCard(item) {
  const card = new Card(item, handleCardClick, '#card-template');
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}


// отрисовка карточки на странице 
const cardList = new Section({
  items: initialCards,
  renderer: (item) => addCard(item)
}, cardListSection) 

cardList.renderItems();


// Открываю попап с картинкой 
const imagePopup = new PopupWithImage('#popup-image');

export function handleCardClick(link, title) {
  imagePopup.open(link, title);
  imagePopup.setEventListeners()
}


// ! Все о валидации

const popupProfileValidate = new FormValidator(validationData, popupProfileForm);
popupProfileValidate.enableValidation();

const popupAddCardValidate = new FormValidator(validationData, popupAddCardForm);
popupAddCardValidate.enableValidation();

// Создаю попап с формой 

const addCardPopup = new PopupWithForm ('#popup-card', submitFormHandler);

function submitFormHandler(data) { 
  addCard(data),
  addCardPopup.close();
  popupAddCardValidate.resetForm();
}

addCardPopup.setEventListeners();
addButton.addEventListener('click', () =>  {
  addCardPopup.open();
});



// Работаю с пользователем 
const user = new UserInfo({
  nameSelector: '.input__text_type_name',
  infoSelector: '.input__text_type_info'
})

// Форма обновления информации профиля
const editProfilePopup = new PopupWithForm ('#popup-profile', submitProfileForm);

function submitProfileForm() {
  user.setUserInfo()
  editProfilePopup.close();
}

function openProfilePopup() {
  editProfilePopup.open();
  popupProfileName.value = user.getUserInfo().name;
  popupProfileInfo.value = user.getUserInfo().info;
  popupProfileValidate.resetForm()
}

editProfilePopup.setEventListeners();
editButton.addEventListener('click', openProfilePopup);

















