import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitForm = submitFormHandler;
        this._form = this._popup.querySelector('.popup__container');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button');
        this._defaultButton = this._button.textContent
    }

   // метод собирает данные всех полей формы 
    _getInputValues() {
        this._formObject = {}
        this._inputList.forEach((input) => { 
            this._formObject[input.name] = input.value;
        });
        return this._formObject;
    }

    // нужно унаследовать этот метод и расширить: добавить обработчик сабмита формы 
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    }

    // унаследовать + сбросить форму 
    close() {
        super.close()
        this._form.reset();
    }

    loading(isLoading) {
        if(isLoading) {
            this._setLoading("Сохранение...");
        } else {
            this._setLoading(this._defaultButton);
        }
    }

    _setLoading(value) {
        this._button.textContent = value;
    }
}