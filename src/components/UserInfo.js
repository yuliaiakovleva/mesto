export class UserInfo {
    constructor ({nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(infoSelector);
    }
    // Метод возвращает объект с данными о пользователе
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        }
    };    
    
    // Принимает новые данные и добавляет их на страницу 
    setUserInfo ({name, about}) {
        this._name.textContent = name;
        this._about.textContent = about;
    }
}


