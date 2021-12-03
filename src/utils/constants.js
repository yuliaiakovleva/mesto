// Про создание карточек 

// Массив картинок // 
// export const initialCards = [
//     {
//       title: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//     {
//       title: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//       title: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//       title: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//       title: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//       title: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
//   ];
  
// контейнер, куда будут добавляться каточки
export const cardListSection = '.places';

// Кнопки
export const editButton = document.querySelector('.input__edit-btn');
export const addButton = document.querySelector('.profile__submit-btn');
export const editAvatarButton = document.querySelector('.profile__image-button');


// Инпуты в форме профиля
export const popupProfileName = document.querySelector('.popup__input_type_name');
export const popupProfileInfo = document.querySelector('.popup__input_type_info');

// 3 элемента формы 
export const popupProfileForm = document.querySelector('#popup-profile-container');
export const popupAddCardForm = document.querySelector('#popup-card__container');
export const popupAvatarForm = document.querySelector('#popup-avatar-container');

// валидация 
export const validationData = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}






// export const popupImage = document.querySelector('#popup-image');
// export const popupImageItem = popupImage.querySelector('.popup__image-item');
// export const popupImageTitle = popupImage.querySelector('.popup__image-name');

// export const closeImageButton = document.querySelector('.popup__close-btn_image');
// export const popupProfile = document.querySelector('#popup-profile');
// export const closeProfileButton = document.querySelector('.popup__close-btn');

// export const inputName = document.querySelector('.input__text_type_name');
// export const inputInfo = document.querySelector('.input__text_type_info');
// export const inputCardName = document.querySelector('#name-mesto-input');
// export const inputCardLink = document.querySelector('#url-input');

// export const formContainer = document.querySelector('.popup__container');

// export const popupCard = document.querySelector('#popup-card');

// export const closeCardButton = document.querySelector('#popup-card__close-btn');



