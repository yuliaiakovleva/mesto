
export class Card {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteCard}, cardSelector) {
      // console.log(data);
      this._name = data.name,
      this._link = data.link,

      this.id = data._id,
      this._myUserId = data.currentUserId,
      this._handleCardClick = handleCardClick,
      this._handleLikeClick = handleLikeClick,
      this._handleDeleteCard = handleDeleteCard,
      this._cardSelector = cardSelector,

      // likes это поле элемента массива, отдельной карточки, внутри класса Card эти данные должны быть, т.к. туда мы объект передаем в цикле {генерации начальных карточек} или через отправку формы {создания новой карточки} 
      this._likes = data.likes,
      this._likesNumders = data.likes.length,
      this._owner = data.owner._id
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
      this._element.querySelector('.card__likes').textContent = this._likesNumders;
  
      this._updateLikeInfo();
      // какое-то условие про то, показываем урну или не показываем 
      this._canDelete()

      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__button-delete').addEventListener('click', () => {
        // this._removeCard();
        this._handleDeleteCard(this);
      });
      this._element.querySelector('.card__button').addEventListener('click', () => {
        this._handleLikeClick(this);
        // this - это экземпляр созданной карточки
      });

      this._element.querySelector('.card__button-image').addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });
  
    }
  
    removeCard() {
      this._element.remove();
    }

    //проверяем, установлен ли лайк (этот метод возвращает истину или ложь в зависимости от того, есть ли на карточке лайк)
    isLiked () {
      return (this._likes.some(user => user._id === this._myUserId));
    }

    // ставим лайк
    setLike (data) {
      this._likes = data; 
      this._element.querySelector('.card__likes').textContent = this._likesNumders;
      this._updateLikeInfo();

    }
    // ставим визуально лайк (визуальное представление). Мы вызываем этот метод и когда лайк ставим, и когда лайк удаляем. поэтому тут нужна проверка
    _updateLikeInfo() {
      if (!this.isLiked()){
        this._element.querySelector('.card__button').classList.remove('card__button_active');
        // this._countCardLikes();
      } else {
        this._element.querySelector('.card__button').classList.add('card__button_active');
        // this._countCardLikes();
      }
    }

  
    // Скорее всего, придется написать новый метод в классе карточки. 
    // Этот метод будет брать ответ с сервера, искать в нем массив лайков, 
    // брать его длину и вставлять в счетчик

    _canDelete() {
      if (this._myUserId != this._owner) {
        this._element.querySelector('.card__button-delete').classList.add('card__button-delete_disabled');
      }
      console.log(this._myUserId);
      console.log('Чьи это данные' + this._owner);

    }
  };
  
