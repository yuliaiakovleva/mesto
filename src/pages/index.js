
import './index.css';

import { Card } from '../components/Сard.js';
import { editAvatarButton, editButton, addButton, popupProfileName, popupProfileInfo, popupProfileForm, popupAvatarForm, popupAddCardForm, cardListSection, validationData } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

function handleError(err) {
  console.error(err);
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '489b71a2-6dad-4d71-8c0a-b02444b12fdc',
    'Content-Type': 'application/json'
  }
});


// api.getInitialCards()
// .then(data => console.log(data))
// .catch(err => console.log(err))

// api.getUserInfo()
// .then(dataUser => console.log(dataUser))
// .catch(err => console.log(err))

let userId = null


// В Promise.all передаем массив промисов с карточками и с инфой профиля. делаем это в promise all, т к 
// инфа профиля завязана на карточки, и нельзя, чтобы одна пришло с сервера раньше другого
Promise.all([api.getInitialCards(), api.getUserInfo()])
  // в then приходят массивы, т е dataCards - это массив карточек, dataUser - массив инфы о профиле
  .then(([dataCards, dataUser]) => {
    userId = dataUser._id;
    // отображаю информацию профиля 
    user.setUserInfo(dataUser)
    // рендерю карточки (вместо initialCards передаю объект dataCards)
    cardList.renderItems(dataCards);
    //
    console.log('Данные карточек', dataCards);
    console.log('Данные пользователя', dataUser);
  })
  .catch(err => console.log(err))
// .catch(handleError);



const createCard = (data) => {
  const card = new Card({
    data: { ...data, currentUserId: userId },
    handleCardClick,
    handleLikeClick: (card) => {
      if (card.isLiked()) {
        api.removeCardLike(card.id)
          .then(cardData => card.setLike(cardData.likes))
      } else {
        api.setCardLike(card.id)
          .then(cardData => card.setLike(cardData.likes))
      }
    },
    handleDeleteCard
  }, '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

const popupDelete = new PopupWithSubmit('#popup-question');
popupDelete.setEventListeners();


function handleDeleteCard(card) {
  popupDelete.open();
  popupDelete.setDeleteClickFormSubmit(() => {

    api.deleteCard(card.id)
      .then(() => {
        card.removeCard();
        popupDelete.close();
      })
  })
}


function addCard(item) {
  const cardElement = createCard(item)
  cardList.addItem(cardElement);
}

// отрисовка карточки на странице 
const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data))
  }
}, cardListSection)



// Открываю попап с картинкой 
const imagePopup = new PopupWithImage('#popup-image',);

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// ! Все о валидации

const popupProfileValidate = new FormValidator(validationData, popupProfileForm);
popupProfileValidate.enableValidation();

const popupAddCardValidate = new FormValidator(validationData, popupAddCardForm);
popupAddCardValidate.enableValidation();

// const popupAvatarValidate = new FormValidator(validationData, popupAvatarForm);
// popupAvatarValidate.enableValidation()


// Создаю попап с добавлением карточки
const addCardPopup = new PopupWithForm('#popup-card', submitFormHandler);

function submitFormHandler(data) {
  addCardPopup.loading(true);
  api.addNewCard(data)
    .then((dataCard) => {
      addCard(dataCard)
    })
    .finally(() => addCardPopup.loading(false));
  addCardPopup.close();
  popupAddCardValidate.resetForm();
}

addButton.addEventListener('click', () => {
  popupAddCardValidate.resetForm();
  addCardPopup.open();
});


// Работаю с пользователем 
const user = new UserInfo({
  // я плохо назвала эти элементы, вообще это строки 
  nameSelector: '.input__text_type_name',
  infoSelector: '.input__text_type_info',
  
  avatarSelector: '.profile__image',
})

// Форма обновления информации профиля
const editProfilePopup = new PopupWithForm('#popup-profile', submitProfileForm);

function submitProfileForm(dataForm) {
  editProfilePopup.loading(true);
  // просим сервер обновить данные
  api.setUserInfo(dataForm)
    // получили данные с сервера, теперь их надо в DOM внести
    .then((data) => {
      user.setUserInfo(data)
    })
    .finally(() => editProfilePopup.loading(false));
  // закрыть попап
  editProfilePopup.close();
}


function openProfilePopup() {
  editProfilePopup.open();
  // не стоит 2 раза вызвать getUserInfo(), лучше сделать так
  const { name, about } = user.getUserInfo()
  popupProfileName.value = name;
  popupProfileInfo.value = about;
  popupProfileValidate.resetForm()
}

editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();

editButton.addEventListener('click', openProfilePopup);


// меняю изображение аватара 

const popupAvatar = new PopupWithForm('#popup-avatar', submitAvatarForm);
popupAvatar.setEventListeners();

//


function submitAvatarForm(link) {
  // запускаем прелоадер
  popupAvatar.loading(true);
  // вызываем апи
  api.changeAvatar(link)
    // апи принимает новый адрес, отправляет его на сервер 
    // ответ ок -> заменяем картинку на фронте
    .then((data) => {
      user.setAvatar(data);
    })
    // выключаем прелоадер
    .finally(() => popupAvatar.loading(false));
  // закрываем попап 
  popupAvatar.close();
}

editAvatarButton.addEventListener('click', () => {
  popupAvatar.open();
});









