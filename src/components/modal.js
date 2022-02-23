//работа модальных окон 
import {closePopup} from './utils.js';
import {popupEdit, jobInput, nameInput, profileName, profileDescrip} from './constants.js';

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
  event.preventDefault(); //отменяет стандартную отправку формы
  const nameValue = nameInput.value;
  profileName.textContent = nameValue;
  const descriptionValue = jobInput.value;
  profileDescrip.textContent = descriptionValue;
  closePopup(popupEdit);
}