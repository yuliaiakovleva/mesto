export class UserInfo {
    constructor ({nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    // Метод возвращает объект с данными о пользователе
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    };    
    
    // Принимает новые данные и добавляет их на страницу 
    setUserInfo ({name, info}) {
        this._name.textContent = name;
        this._info.textContent = info;
    }
}


