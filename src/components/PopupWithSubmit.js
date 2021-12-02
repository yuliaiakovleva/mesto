import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
    }

    // колбек передается не в конструктор, а в метод. Т К у каждой карточки своя функция удаления, и мы будем просто подменять каждый раз функцию
    //getinputvalues не надо

    setDeleteClickFormSubmit (action) {
        this._submitFormHandler = action;
    }
    
    setEventListeners() {
       super.setEventListeners();
       this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormHandler();
        });
    }
};
