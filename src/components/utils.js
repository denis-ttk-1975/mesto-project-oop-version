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
//функция для загрузки
export function getLoader(button) {
  button.textContent = "Сохранение...";
}
//функция после завершения загрузки
export function deleteLoader(button) {
  button.textContent = "Сохранить";
}