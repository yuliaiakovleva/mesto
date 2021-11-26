
import './index.css';

import { Card } from '../components/Сard.js';
import { initialCards, editButton, addButton, popupProfileName, popupProfileInfo, popupProfileForm, popupAddCardForm, cardListSection, validationData} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js'



function createCard(item) {
  const card = new Card(item, handleCardClick, '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(item) {
  const cardElement = createCard(item)
  cardList.addItem(cardElement);
}

// отрисовка карточки на странице 
const cardList = new Section({
  items: initialCards,
  renderer: addCard
}, cardListSection) 

cardList.renderItems();


// Открываю попап с картинкой 
const imagePopup = new PopupWithImage('#popup-image');

export function handleCardClick(link, title) {
  imagePopup.open(link, title);
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

addButton.addEventListener('click', () =>  {
  popupAddCardValidate.resetForm();
  addCardPopup.open();
});



// Работаю с пользователем 
const user = new UserInfo({
  // я плохо назвала эти элементы, вообще это строки 
  nameSelector: '.input__text_type_name',
  infoSelector: '.input__text_type_info'
})

// Форма обновления информации профиля
const editProfilePopup = new PopupWithForm ('#popup-profile', submitProfileForm);

function submitProfileForm(data) {
  user.setUserInfo(data)
  editProfilePopup.close();
}

function openProfilePopup() {
  editProfilePopup.open();
  // не стоит 2 раза вызвать getUserInfo(), лучше сделать так
  const {name, info } = user.getUserInfo()
  popupProfileName.value = name;
  popupProfileInfo.value = info;
  popupProfileValidate.resetForm()
}

editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();

editButton.addEventListener('click', openProfilePopup);

















