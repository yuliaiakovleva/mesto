// function onResponse(res) {
//     if (res.ok) {
//         return res.json();
//     }
//       // если ошибка, отклоняем промиc
//      return Promise.reject(`Ошибка: ${res.status}`);                 
// }

export class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    };

    _checkResponse(res){
        if (res.ok) {
            return res.json();
        }
          // если ошибка, отклоняем промиc
         return Promise.reject(`Ошибка: ${res.status}`); 
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then(this._checkResponse)
 
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._checkResponse)
 
    };

    setUserInfo(inputValue) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValue.name,
                about: inputValue.about,
                avatar: inputValue.avatar
            })
          })
        .then(this._checkResponse)
 
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
        .then(this._checkResponse)
 
    }

    setCardLike(cardId){
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
          })
        .then(this._checkResponse)
 
    }

    removeCardLike(cardId){
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
          })
        .then(this._checkResponse)
 
    }
    
    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
          })
        .then(this._checkResponse)
 
    }

    changeAvatar({link}){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({avatar: link})
          })
        .then(this._checkResponse)
 
    }

}
