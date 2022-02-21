import '../pages/index.css';
import {closePopup, openPopup} from './utils.js';
import {handleClick, popupAll, formSubmitEdit, formElementProfile} from './modal.js';
import {enableValidation, validationConfig} from './validate.js';
import {
  cardsList, formSubmitAdd, 
  buttonEdit, buttonEditClose, buttonAdd, buttonAddClose, imageClose, formElementLocation, popupAdd, popupEdit, imageOpen } from './card.js';

export const initialCards = [
  {
    name: "Карелия",
    link: "https://images.unsplash.com/photo-1548288242-d454d4648b55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80",
  },
  {
    name: "Калининград",
    link: "https://images.unsplash.com/photo-1572872750804-15c2b20473de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1599343265703-0f5a075c49f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Минск",
    link: "https://images.unsplash.com/photo-1591509352193-c3e6676f71c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// открыть попап редактирования профиля
buttonEdit.addEventListener("click", function () {
  openPopup(popupEdit)
});
//закрыть попап редактирования профиля
buttonEditClose.addEventListener("click", function () {
  closePopup(popupEdit);
});
//открыть попап для добавления карточки
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd)
});
//закрыть попап добавления карточки
buttonAddClose.addEventListener("click", function () {
  closePopup(popupAdd);
});
//обработчик функции редактирования профиля
formElementProfile.addEventListener("submit", formSubmitEdit);
//закрыть попап картинки
imageClose.addEventListener("click", function () {
  closePopup(imageOpen);
});
//обработчик функции добавления карточки
formElementLocation.addEventListener("submit", formSubmitAdd);
//обработчик закрытия попапа при клике на оверлей
popupAll.forEach(function (popup) {
  popup.addEventListener("click", handleClick);
});

cardsList();
enableValidation(validationConfig);