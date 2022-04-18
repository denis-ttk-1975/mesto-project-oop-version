//попап редактирования профиля и его элементы
export const popupEdit = document.querySelector(".popup_type_edit");
export const buttonProfile = popupEdit.querySelector(".form__button");
export const formElementProfile = popupEdit.querySelector(".form");
export const jobInput = formElementProfile.querySelector(".form__item_type_description");
export const nameInput = formElementProfile.querySelector(".form__item_type_name");
//попап добавления карточки и его элементы
export const popupAdd = document.querySelector(".popup_type_add");
export const buttonFormAdd = popupAdd.querySelector(".form__button");
export const addCardFormFieldSet = popupAdd.querySelector(".form__edit");
//попап редактирования аватара и его элементы
export const popupAvatar = document.querySelector(".popup_type_avatar");
export const buttonAvatarPhoto = popupAvatar.querySelector(".form__button");
//попап подтверждения удаления карточки и его элементы
export const popupConfidence = document.querySelector(".popup__remove-card");
export const buttonConfidence = popupConfidence.querySelector(".form__button");
//попап открытия изображения созданной карточки и его элементы
export const imageOpen = document.querySelector(".popup_type_image");
//кнопки на основной странице
export const buttonEdit = document.querySelector(".profile__button_act_edit");
export const buttonAdd = document.querySelector(".profile__button_act_add");
export const buttonAvatar = document.querySelector(".profile__button_act_avatar");
//секция с карточками
export const placeSectionSelector = ".places";
//элемент карточки
export const cardTemplateSelector = "#card_template";
//элементы профиля
export const profileSelectors = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
};
//объект настроек
export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  errorClass: "form__item_type_active",
  inputErrorClass: "form__input-error",
  inactiveButtonClass: "form__button_disabled",
};