//утилитарные функции
function closePopup(popup) {    //НЕ ЗДЕСЬ, в modal.js
  popup.classList.remove("popup_opened"); 
  window.removeEventListener('keydown', handleEscDown);
}
//функция закрытия попапа при нажатии ESC
const handleEscDown = (event) => {
  const activePopup = document.querySelector(".popup_opened");
  if ((event.key === "Escape" && activePopup) || activePopup) {
    closePopup(activePopup);
  }
};
//функция закрытия попапа при клике на оверлей
const popupAll = document.querySelectorAll(".popup");
const handleClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
};
//обработчик закрытия попапа при клике на оверлей
popupAll.forEach(function (popup) {
  popup.addEventListener("click", handleClick);
});
