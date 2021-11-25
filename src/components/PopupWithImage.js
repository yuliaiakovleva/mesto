import { Popup } from "./Popup.js";


export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
         this._image = this._selector.querySelector('.popup__image-item');
         this._text = this._selector.querySelector('.popup__image-name');
    }

    open(link, title) {
        this._image.src = link;
        this._text.textContent = title;
        this._image.alt = title;
        super.open()
    }
}