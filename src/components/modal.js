//работа модальных окон
import { closePopup, getLoader } from "./utils.js";
import {popupEdit, jobInput, nameInput, profileName,
    profileDescrip, popupConfidence, profileImage, avatarInput,
    formElementAvatar, buttonProfile} from "./constants.js";
import { patchProfile, patchAvatar } from "./api.js";

//функция закрытия попапа при нажатии ESC
export const handleEscDown = (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
};
//функция закрытия попапа при клике на оверлей или крестик
export const handleClick = (event) => {
  if (event.target.classList.contains("popup_opened")) {
    closePopup(event.currentTarget);
  }
  if (event.target.classList.contains("popup__close")) {
    closePopup(event.currentTarget);
  }
};
// функция редактирования профиля
export function handleProfileFormSubmit(event) {
  event.preventDefault();
  patchProfile(nameInput.value, jobInput.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileDescrip.textContent = result.about;
      getLoader(buttonProfile);
      closePopup(popupEdit);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}
// функция редактирования аватара
export function handleAvatarSubmit(event) {
  event.preventDefault();
  patchAvatar(avatarInput.value)
    .then((result) => {
      profileImage.src = result.avatar;
      formElementAvatar.reset();
      closePopup(popupConfidence);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
}
