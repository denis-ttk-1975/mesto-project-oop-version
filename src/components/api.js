export class Api {
  constructor(config) {
    this._apiConfig = config
  }

  //функция проверки ответа сервера на запрос
  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //функция получения данных о карточках
  getInitialCards() {
    return fetch(`${this._apiConfig.baseURL}/cards`, {
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  //функция получения данных пользователя
  getUserInfo() {
    return fetch(`${this._apiConfig.baseURL}/users/me`, {
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  //функция для получения/редактирования данных профиля
  patchProfile(name, about) {
    return fetch(`${this._apiConfig.baseURL}/users/me`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  //функция для получения/редактирования фото аватара
  patchAvatar(avatar) {
    return fetch(`${this._apiConfig.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  //функция добавления новой карточки
  postNewCard(name, link) {
    return fetch(`${this._apiConfig.baseURL}/cards`, {
      method: "POST",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  //функция удаления новой карточки
  deleteCard(card) {
    return fetch(`${this._apiConfig.baseURL}/cards/${card}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  //функция для обозначения лайка
  putLikeOnCard(card) {
    return fetch(`${this._apiConfig.baseURL}/cards/likes/${card}`, {
      method: "PUT",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }

  //функция для удаления лайка
  deleteLikeOnCard(card) {
    return fetch(`${this._apiConfig.baseURL}/cards/likes/${card}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._checkResponse);
  }
}