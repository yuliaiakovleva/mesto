
import './index.css';

import { Card } from '../components/Сard.js';
import { deleteButton, editButton, addButton, popupProfileName, popupProfileInfo, popupProfileForm, popupAddCardForm, cardListSection, validationData} from '../utils/constants.js';
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
    data: {...data, currentUserId: userId},
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
      // handleDeleteCard
    }, '#card-template');
    const cardElement = card.generateCard();
    return cardElement;
  }


// function handleDeleteCard(card) {

// }

// const deletePopup = new PopupWithSubmit('#popup-question');
// deletePopup.setEventListeners();

//   document.querySelector('.card__button-delete').addEventListener('click', () =>  {
//      console.log('что происходит')
// });



function addCard(item) {
  const cardElement = createCard(item)
  cardList.addItem(cardElement);
}

// отрисовка карточки на странице 
const cardList = new Section({
  renderer:(data) => {
    cardList.addItem(createCard(data))
  }
}, cardListSection) 



// Открываю попап с картинкой 
const imagePopup = new PopupWithImage('#popup-image', );

function handleCardClick(link, name) {
  imagePopup.open(link, name);
}

// ! Все о валидации

const popupProfileValidate = new FormValidator(validationData, popupProfileForm);
popupProfileValidate.enableValidation();

const popupAddCardValidate = new FormValidator(validationData, popupAddCardForm);
popupAddCardValidate.enableValidation();



// Создаю попап с добавлением карточки
const addCardPopup = new PopupWithForm ('#popup-card', submitFormHandler);

function submitFormHandler(data) { 
  api.addNewCard(data)
  .then((responce) => {
    addCard(responce)
  .catch(handleError)
  });
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

function submitProfileForm(dataForm) {
  // просим сервер обновить данные
  api.setUserInfo(dataForm)
  // получили данные с сервера, теперь их надо в DOM внести
  .then((data) => {
    user.setUserInfo(data)
  })
  // закрыть попап
  editProfilePopup.close();
}



function openProfilePopup() {
  editProfilePopup.open();
  // не стоит 2 раза вызвать getUserInfo(), лучше сделать так
  const {name, about } = user.getUserInfo()
  popupProfileName.value = name;
  popupProfileInfo.value = about;
  popupProfileValidate.resetForm()
}

editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
addCardPopup.setEventListeners();

editButton.addEventListener('click', openProfilePopup);

















