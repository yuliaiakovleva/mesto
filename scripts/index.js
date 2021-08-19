//let content = document.querySelector('.content');
const editButton = document.querySelector('.input__edit-btn');
const popupProfile = document.querySelector('#popup-profile');
const closeButton = document.querySelector('.popup__close-btn');
const popupProfileName = document.querySelector('.popup__text_type_name');
const popupProfileInfo = document.querySelector('.popup__text_type_info');
const inputName = document.querySelector('.input__text_type_name');
const inputInfo = document.querySelector('.input__text_type_info');
// const form = document.querySelector('.profile');

const formElement = document.querySelector('.popup__container');


// Открытие и закрытие модального окна 

function openPopup (popup) {
  popup.classList.add('popup_is-opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

// Открытие модального окна профайла 

function openPopupProfile() {
  openPopup(popupProfile);
  popupProfileName.value = inputName.textContent;
  popupProfileInfo.value = inputInfo.textContent;
}

function closePopupProfile() {
  closePopup(popupProfile);
}

editButton.addEventListener('click', openPopupProfile);
closeButton.addEventListener('click', closePopupProfile);

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  inputName.textContent = popupProfileName.value;
  inputInfo.textContent = popupProfileInfo.value;
  closePopupProfile();
}

formElement.addEventListener('submit', formSubmitHandler); 

// Карточки //

const cardList = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

const popupCard = document.querySelector('#popup-card');
const addButton = document.querySelector('.profile__submit-btn');
const closeCardButton = document.querySelector('#popup-card__close-btn');

const popupCardElement = document.querySelector('#popup-card__container');
const inputCardName = document.querySelector('#popup-card__text_type_name');
const inputCardLink = document.querySelector('#popup-card__text_type_link');


// 


// Массив картинок // 
const initialCards = [
    {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 


// удаление карточек
function removeCard(e) {
    e.target.closest('.card').remove();
};


// добавление карточек
 function createCard (title, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
    const cardIllustration = cardElement.querySelector('.card__illustration');
    const cardTitle = cardElement.querySelector('.card__title');
    
    cardIllustration.src = link; 
    cardTitle.textContent = title; 
    cardIllustration.alt = title;

    // удаление карточек 
    cardElement.querySelector('.card__button-delete').addEventListener('click', removeCard);
    //

    // лайк
    cardElement.querySelector('.card__button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__button_active');
  });
    // 

    cardElement.querySelector('.card__button-image').addEventListener('click', openCard);

    cardElement.querySelector('.card__button-image').addEventListener('click', () => openCard(title, link));

    cardList.prepend(cardElement); 
};


//  Разложение массива 
 initialCards.forEach(card => createCard (card.title, card.link));
 
 
// Открытие попапа с добавлением карточки 

function openPopupCard() {
  openPopup(popupCard);
};

function closePopupCard() {
  closePopup(popupCard);
};

addButton.addEventListener('click', openPopupCard);
closeCardButton.addEventListener('click', closePopupCard);


// Добавление карточки через попап 

function popupCardSubmitHandler (evt) {
    evt.preventDefault(); 
    
    createCard(inputCardName.value, inputCardLink.value);

    inputCardLink.value = '';
    inputCardName.value = '';

    closePopupCard();
};

popupCardElement.addEventListener('submit', popupCardSubmitHandler); 


// открытие картинок

const closeImageButton = document.querySelector('.popup__close-btn_image');
const popupImage = document.querySelector('#popup-image');
const popupImageItem = popupImage.querySelector('.popup__image-item');
const popupImageTitle = popupImage.querySelector('.popup__image-name');

function closeImage () {
  closePopup(popupImage);
};

closeImageButton.addEventListener('click', closeImage);

function openCard (title, link) {
  popupImageItem.src = link;
  popupImageItem .alt = link;
  popupImageTitle.textContent = title;

  openPopup(popupImage);
};


