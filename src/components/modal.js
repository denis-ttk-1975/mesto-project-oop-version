//работа модальных окон 
import {closePopup} from './utils.js';
import {popupEdit} from './card.js';
export const formElementProfile = document.querySelector("#profile");
const jobInput = formElementProfile.querySelector(".form__item_type_description");
const nameInput = formElementProfile.querySelector(".form__item_type_name");
//функция закрытия попапа при нажатии ESC
export const handleEscDown = (event) => {
    const activePopup = document.querySelector(".popup_opened");
    if (event.key === "Escape") {
      closePopup(activePopup);
    }
  };
  //функция закрытия попапа при клике на оверлей
  export const popupAll = document.querySelectorAll(".popup");
  export const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  };
  // функция редактирования профиля
export function formSubmitEdit(event) {
  event.preventDefault(); //отменяет стандартную отправку формы
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  const profileName = document.querySelector(".profile__name");
  const profileDescrip = document.querySelector(".profile__description");
  profileName.textContent = nameValue;
  profileDescrip.textContent = descriptionValue;
  closePopup(popupEdit);
}