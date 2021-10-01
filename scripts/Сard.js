import {openPopup, closePopup} from './index.js'

import { popupImage, popupImageItem, popupImageTitle } from './constants.js'

export class Card {
    constructor(data, cardSelector) {
      this._title = data.title,
      this._link = data.link,
      this._cardSelector = cardSelector
    };
  
    _getTemplate() {
      const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
  
      this._element.querySelector('.card__illustration').src = this._link;
      this._element.querySelector('.card__title').textContent = this._title;
  
      return this._element;
    }
  
    _setEventListeners() {
        this._element.querySelector('.card__button-image').addEventListener('click', () => {
        this._handleOpenPopup();
      });
      this._element.querySelector('.card__button-delete').addEventListener('click', () => {
        this._removeCard();
      });
      this._element.querySelector('.card__button').addEventListener('click', () => {
        this._likeCard();
      });
  
    }
  
    _handleOpenPopup() {
        openPopup(popupImage) 
      popupImageItem.src = this._link;
      popupImageTitle.textContent = this._title;
    
    }
  
    _handleClosePopup() {
      closePopup(popupImage);
    }
  
    _removeCard() {
      this._element.remove();
    }
  
    _likeCard() {
      this._element.querySelector('.card__button').classList.toggle('card__button_active');
    }
  };
  


