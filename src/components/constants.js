//constants
export const popups = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector(".popup_type_add");
export const buttonEdit = document.querySelector(".profile__button");
export const buttonAdd = document.querySelector(".profile__button_act_add");
export const imageOpen = document.querySelector(".popup_type_image");
export const imageOpeninPopup = imageOpen.querySelector(".popup__title");
export const imageInPopup = document.querySelector(".popup__image");
export const imageClose = imageOpen.querySelector("#active_img");
export const placeSection = document.querySelector(".places"); //секция, где должны быть карточки
export const formElementLocation = document.querySelector("#location");
export const inputElementLocation = formElementLocation.querySelector(".form__item_type_location");
export const inputElementLink = formElementLocation.querySelector(".form__item_type_link");
export const formElementProfile = document.querySelector("#profile");
export const jobInput = formElementProfile.querySelector(".form__item_type_description");
export const nameInput = formElementProfile.querySelector(".form__item_type_name");

//объект настроек
export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    errorClass: 'form__item_type_active',
    inputErrorClass:'form__input-error',
    inactiveButtonClass: 'form__button_disabled',
  }

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