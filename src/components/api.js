export default class Api {
  constructor() {
    //Мне нравится идея указать конфиг в конструкторе
    //Если будут возражения ревьювера, то можно исправить
    this._apiConfig = {
      baseURL: "https://nomoreparties.co/v1/plus-cohort7",
      headers: {
        authorization: "bb6ff8a2-6249-481e-b654-c07491020021",
        "Content-Type": "application/json",
      },
    }
  }

  //функция проверки ответа сервера на запрос
  _checkResponse(res) {
    if (res.ok) return res.json()
  
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //функция получения данных о карточках
  getInitialCards() {
    return fetch(`${_apiConfig.baseURL}/cards`, {
      headers: _apiConfig.headers,
    })
    .then(checkResponse)
  }

  //функция получения данных пользователя
  getUserInfo() {
    return fetch(`${_apiConfig.baseURL}/users/me`, {
      headers: _apiConfig.headers,
    })
    .then(checkResponse)
  }

  //функция для получения/редактирования данных профиля
  patchProfile(name, about) {
    return fetch(`${_apiConfig.baseURL}/users/me`, {
      method: "PATCH",
      headers: _apiConfig.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(checkResponse)
  }

  //функция для получения/редактирования фото аватара
  patchAvatar(avatar) {
    return fetch(`${_apiConfig.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: _apiConfig.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
    .then(checkResponse)
  }

  //функция добавления новой карточки
  postNewCard(name, link) {
    return fetch(`${_apiConfig.baseURL}/cards`, {
      method: "POST",
      headers: _apiConfig.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then(checkResponse)
  }

  //функция удаления новой карточки
  deleteCard(card) {
    return fetch(`${_apiConfig.baseURL}/cards/${card}`, {
      method: "DELETE",
      headers: _apiConfig.headers,
    })
    .then(checkResponse)
  }

  //функция для обозначения лайка
  putLikeOnCard(card) {
    return fetch(`${_apiConfig.baseURL}/cards/likes/${card}`, {
      method: "PUT",
      headers: _apiConfig.headers,
    })
    .then(checkResponse)
  }

  //функция для удаления лайка
  deleteLikeOnCard(card) {
    return fetch(`${_apiConfig.baseURL}/cards/likes/${card}`, {
      method: "DELETE",
      headers: _apiConfig.headers,
    })
    .then(checkResponse)
  }
}
