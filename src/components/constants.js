//constants
export const popups = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector(".popup_type_add");
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const buttonEdit = document.querySelector(".profile__button");
export const buttonAdd = document.querySelector(".profile__button_act_add");
export const buttonAvatar = document.querySelector(".profile__button_act_avatar");
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
export const profileName = document.querySelector(".profile__name");
export const profileDescrip = document.querySelector(".profile__description");
export const cardTemplate = document.querySelector("#card_template").content;
export const profileImage = document.querySelector(".profile__image");
export const buttonProfile = popupEdit.querySelector('.form__button');
export const buttonAvatarPhoto = popupAvatar.querySelector('.form__button');
export const formElementAvatar = document.querySelector(".form_type_avatar");
export const avatarInput = formElementAvatar.querySelector(".form__item_type_avatar");
export const popupConfidence = document.querySelector(".popup__remove-card");
export const formConfidence = popupConfidence.querySelector(".form_type_remove-card");

//объект настроек
export const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.form__button',
    errorClass: 'form__item_type_active',
    inputErrorClass:'form__input-error',
    inactiveButtonClass: 'form__button_disabled',
  }

export const apiConfig = {
  baseURL: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "bb6ff8a2-6249-481e-b654-c07491020021",
    "Content-Type": "application/json",
  },
};