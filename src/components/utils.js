//функция загрузки
export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
//функция удаления
export function renderRemoving(isRemoving, button) {
  if (isRemoving) {
    button.textContent = "Удаление...";
  } else {
    button.textContent = "Да";
  }
}