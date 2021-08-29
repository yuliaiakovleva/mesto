//let content = document.querySelector('.content');
const editButton = document.querySelector('.input__edit-btn');
const popupProfile = document.querySelector('#popup-profile');
const closeButton = document.querySelector('.popup__close-btn');
const popupProfileName = document.querySelector('.popup__input_type_name');
const popupProfileInfo = document.querySelector('.popup__input_type_info');
const inputName = document.querySelector('.input__text_type_name');
const inputInfo = document.querySelector('.input__text_type_info');
// const form = document.querySelector('.profile');

const formContainer = document.querySelector('.popup__container');


// Открытие и закрытие модального окна 

function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupWithEsc);
  };

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}


editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  popupProfileName.value = inputName.textContent;
  popupProfileInfo.value = inputInfo.textContent;
});
closeButton.addEventListener('click', () => closePopup(popupProfile));

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  inputName.textContent = popupProfileName.value;
  inputInfo.textContent = popupProfileInfo.value;
  closePopup(popupProfile);
}

formContainer.addEventListener('submit', formSubmitHandler); 

// Карточки //

const cardList = document.querySelector('.places');
const cardTemplate = document.querySelector('#card-template').content;

const popupCard = document.querySelector('#popup-card');
const addButton = document.querySelector('.profile__submit-btn');
const closeCardButton = document.querySelector('#popup-card__close-btn');

const popupCardElement = document.querySelector('#popup-card__container');
const inputCardName = document.querySelector('#name-mesto-input');
const inputCardLink = document.querySelector('#url-input');


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
 function createCard(title, link) {
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
    
  // открытие картинки на всю страницу
    cardElement.querySelector('.card__button-image').addEventListener('click', () => openCard(title, link));

    return cardElement;
};


// добавляю заготовку карточки в разметку
function renderCard (card) {
const newCard = createCard (card.title, card.link);
cardList.prepend(newCard);
};

// добавляю 6 карточек на страницу
initialCards.forEach(card => renderCard (card)); 


addButton.addEventListener('click', () => openPopup(popupCard));
closeCardButton.addEventListener('click', () => closePopup(popupCard));


// Добавление карточки через попап 

function popupCardSubmitHandler (evt) {
    evt.preventDefault(); 

    const cardObject = {};
    cardObject.title = inputCardName.value;
    cardObject.link = inputCardLink.value;
    
    renderCard(cardObject);

    // сбрасываю значения полей, чтобы прии повторном открытии они были пустые 
    popupCardElement.reset();

    // закрываю попап
    closePopup(popupCard);
};

popupCardElement.addEventListener('submit', popupCardSubmitHandler); 


// открытие картинок

const closeImageButton = document.querySelector('.popup__close-btn_image');
const popupImage = document.querySelector('#popup-image');
const popupImageItem = popupImage.querySelector('.popup__image-item');
const popupImageTitle = popupImage.querySelector('.popup__image-name');


closeImageButton.addEventListener('click', () => closePopup(popupImage));

function openCard (title, link) {
  popupImageItem.src = link;
  popupImageItem .alt = link;
  popupImageTitle.textContent = title;

  openPopup(popupImage);
};


// Закрытие попапа кликом на оверлей 
const popupOverlay = document.querySelectorAll('.popup');

popupOverlay.forEach(item => {
  item.addEventListener('click', function (evt) { 
    if(evt.target.classList.contains('popup')) {
      closePopup(item);
    }
  });
  });


// Закрытие попапа(модального окна) нажатием на esc
const closePopupWithEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  };
};