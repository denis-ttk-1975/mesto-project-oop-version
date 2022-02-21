//утилитарные функции
import {handleEscDown} from './modal.js';
export function closePopup(popup) {
  popup.classList.remove("popup_opened"); 
  window.removeEventListener('keydown', handleEscDown);
};
//функция открытия попапа
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener('keydown', handleEscDown);
}