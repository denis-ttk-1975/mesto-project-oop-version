import { apiConfig, profileName, profileDescrip, profileImage } from "./constants.js";
//функция проверки ответа сервера на запрос
export function checkError(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
//функция получения данных о карточках
export const getInitialCards = () => {
  //return fetch(`${apiConfig.baseUrl}/cards`, {
    return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards`, {
    headers: apiConfig.headers,
  }).then(checkError);
};
//функция получения данных пользователя
export const getUserInfo = () => {
  //return fetch(`${apiConfig.baseUrl}/users/me`, {
    return fetch(`https://nomoreparties.co/v1/plus-cohort7/users/me`, {
    headers: apiConfig.headers,
  }).then(checkError);
};
//функция для получения/редактирования данных профиля
export const patchProfile = (name, about) => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkError);
};
//функция для получения/редактирования фото аватара
export const patchAvatar = (avatar) => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(checkError);
};
//функция добавления новой карточки
export const postNewCard = (name, link) => {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkError);
};
//функция удаления новой карточки
export const deleteCard = (card) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/${card}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkError);
};
//функция для обозначения лайка
export const putLikeOnCard = (card) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${card}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(checkError);
};
//функция для удаления лайка
export const deleteLikeOnCard = (card) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${card}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkError);
};
//функция обновления информации о профиле
export let userId;
export function updateUserInfo(info) {
  userId = info._id;
  profileName.textContent = info.name;
  profileDescrip.textContent = info.about;
  profileImage.src = info.avatar;
};