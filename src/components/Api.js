function onResponse(res) {
    if (res.ok) {
        return res.json();
    }
      // если ошибка, отклоняем промиc
     return Promise.reject(`Ошибка: ${res.status}`);                 
}

export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    };

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then(onResponse)
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(onResponse)
    };

    setUserInfo(inputValue) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.about
            })
          })
        .then(onResponse)
    };

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
          })
        .then(onResponse)
    }

    setCardLike(cardId){
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
          })
        .then(onResponse)
    }

    removeCardLike(cardId){
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
          })
        .then(onResponse)
    }
}
