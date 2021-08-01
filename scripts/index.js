//let content = document.querySelector('.content');
let editButton = document.querySelector('.input__edit-btn');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-btn');
let popupName = document.querySelector('.popup__text_type_name');
let popupInfo = document.querySelector('.popup__text_type_info');
let inputName = document.querySelector('.input__text_type_name');
let inputInfo = document.querySelector('.input__text_type_info');
let form = document.querySelector('.profile');

let formElement = document.querySelector('.popup__container');

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



