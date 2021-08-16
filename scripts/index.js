//let content = document.querySelector('.content');
const editButton = document.querySelector('.input__edit-btn');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-btn');
const popupName = document.querySelector('.popup__text_type_name');
const popupInfo = document.querySelector('.popup__text_type_info');
const inputName = document.querySelector('.input__text_type_name');
const inputInfo = document.querySelector('.input__text_type_info');
const form = document.querySelector('.profile');

const formElement = document.querySelector('.popup__container');


function popupOpened () {
    popup.classList.add('popup_opened');
    popupName.value = inputName.textContent;
    popupInfo.value = inputInfo.textContent;
}

function popupClosed () {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpened);
closeButton.addEventListener('click', popupClosed);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    inputName.textContent = popupName.value;
    inputInfo.textContent = popupInfo.value;
    popupClosed ();
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
 function addCard (title, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
    
    cardElement.querySelector('.card__illustration').src = link; 
    cardElement.querySelector('.card__title').textContent = title; 
    cardElement.querySelector('.card__illustration').alt = title;

    // удаление карточек 
    cardElement.querySelector('.card__button-delete').addEventListener('click', removeCard);
    //

    // лайк
    cardElement.querySelector('.card__button').addEventListener('click', function(evt) {
      evt.target.classList.toggle('card__button_active');
  });
    // 

    cardElement.querySelector('.card__button-image').addEventListener('click', openCard);
    
    cardList.prepend(cardElement);
 };


//  Разложение массива 
 initialCards.forEach(card => addCard (card.title, card.link));
 
 
// Открытие попапа с добавлением карточки 
function popupCardOpened () {
    popupCard.classList.add('popup_opened');
};

function popupCardClosed () {
    popupCard.classList.remove('popup_opened');
};

addButton.addEventListener('click', popupCardOpened);
closeCardButton.addEventListener('click', popupCardClosed);


function popupCardSubmitHandler (evt) {
    evt.preventDefault(); 
    
    addCard(inputCardName.value, inputCardLink.value);

    inputCardLink.value = '';
    inputCardName.value = '';

    popupCardClosed ();
};

popupCardElement.addEventListener('submit', popupCardSubmitHandler); 



// // открытие картинок
// const openImageButton = document.querySelector('.card__button-image');
const closeImageButton = document.querySelector('.popup-image__close-btn');
// const popupImage = document.querySelector('.popup-image');

// function openImage (title, link) {
//   popupImage.classList.add('popup-image_opened');
// };


function closeImage () {
  document.querySelector('.popup-image').classList.remove('popup-image_opened');
};

closeImageButton.addEventListener('click', closeImage);

function openCard (evt) {
  const popupImage = document.querySelector('.popup-image');
  popupImage.querySelector('.popup-image__item').src = evt.target.src;
  popupImage.querySelector('.popup-image__item').alt = evt.target.alt;
  popupImage.querySelector('.popup-image__name').textContent = evt.target.alt;
  
  popupImage.classList.add('popup-image_opened');
};


