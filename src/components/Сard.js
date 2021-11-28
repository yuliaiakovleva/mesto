
export class Card {
    constructor({data, handleCardClick, handleLikeClick}, cardSelector) {
      console.log(data);
      this._likes = data.likes,
      this._name = data.name,
      this._link = data.link,
      this.id = data._id,
      this._userId = data.currentUserId,
      this._handleCardClick = handleCardClick,
      this._handleLikeClick = handleLikeClick,
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
      this._element.querySelector('.card__title').textContent = this._name;
      this._element.querySelector('.card__illustration').alt = this._name;
  
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__button-delete').addEventListener('click', () => {
        this._removeCard();
      });
      this._element.querySelector('.card__button').addEventListener('click', () => {
        this._handleLikeClick(this);
      });

      this._element.querySelector('.card__button-image').addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
  
    }
  
    removeCard() {
      this._element.remove();
    }

    isLiked () {
      return this._likes.some(user => user._id === this._userId);
    }

    setLike (data) {
      this._likes = data; 
      this._updateLikeInfo();
    }

    _updateLikeInfo() {
      if (!this.isLiked()){
        this._element.querySelector('.card__button').classList.remove('card__button_active');
      } else {
        this._element.querySelector('.card__button').classList.add('card__button_active');
      }
      
    }
  
    // _likeCard() {
    //   this._element.querySelector('.card__button').classList.toggle('card__button_active');
    // }
  };
  
