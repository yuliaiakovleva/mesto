export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    open() {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    };

    close() {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    };

    setEventListeners() {
    //   надо найти крестик и повестить на него обработчик события по клику - вызываем метод close
        const closeButton = this._popup.querySelector('.popup__close-btn');
        closeButton.addEventListener('click', () => {
            this.close();
      });
    //   закрытие попапа кликом на оверлей
        this._popup.addEventListener('click', (evt) => {
                if (evt.target === evt.currentTarget) {
                    this.close();
                }
        });
    }
}
