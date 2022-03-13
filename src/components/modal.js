//работа модальных окон
import { closePopup, renderLoading } from "./utils.js";
import {popupEdit, popupAvatar, jobInput, nameInput, avatarInput,
  profileName, profileDescrip, profileImage, 
  formElementAvatar, buttonProfile, buttonAvatarPhoto} from "./constants.js";
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
  renderLoading(true, buttonProfile);
  patchProfile(nameInput.value, jobInput.value)
    .then((result) => {
      profileName.textContent = result.name;
      profileDescrip.textContent = result.about;
      closePopup(popupEdit);
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() =>{
      renderLoading(false, buttonProfile);
    })
}
// функция редактирования аватара
export function handleAvatarSubmit(event) {
  event.preventDefault();
  renderLoading(true, buttonAvatarPhoto);
  patchAvatar(avatarInput.value)
    .then((result) => {
      profileImage.src = result.avatar;
      closePopup(popupAvatar);
      formElementAvatar.reset();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() =>{
      renderLoading(false, buttonAvatarPhoto);
    })
    
}
