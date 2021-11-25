export class UserInfo {
    constructor ({nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._inputName = document.querySelector('.popup__input_type_name');
        this._inputInfo = document.querySelector('.popup__input_type_info')
    }
    // Метод возвращает объект с данными о пользователе
    getUserInfo() {
        return {
            name: this._name.textContent,
            info: this._info.textContent
        }
    };    
    
    // Принимает новые данные и добавляет их на страницу 
    setUserInfo () {
        this._name.textContent = this._inputName.value;
        this._info.textContent = this._inputInfo.value
    }
}


