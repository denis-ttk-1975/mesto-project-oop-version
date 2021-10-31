const initialCards = [
  {
    name: "Карелия",
    link: "https://images.unsplash.com/photo-1548288242-d454d4648b55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80",
  },
  {
    name: "Калининград",
    link: "https://images.unsplash.com/photo-1572872750804-15c2b20473de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Москва",
    link: "https://images.unsplash.com/photo-1599343265703-0f5a075c49f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    name: "Минск",
    link: "https://images.unsplash.com/photo-1591509352193-c3e6676f71c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//открытие попап
const profile__button = document.querySelector(".profile__button");
profile__button.addEventListener("click", function () {
  document.querySelector(".popup").classList.add("popup_opened");
});
//закрытие попап
const buttonEditClose = document.querySelector(".popup__close");
function close() {
  document.querySelector(".popup").classList.remove("popup_opened");
}
buttonEditClose.addEventListener("click", close);
const formElementProfile = document.querySelector("#profile");
const nameInput = formElementProfile.querySelector(".form__item_type_name");
const jobInput = formElementProfile.querySelector(
  ".form__item_type_description"
);
// Обработчик «отправки» формы, пока она никуда отправляться не будет
function formSubmitEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;
  const nameOutput = document.querySelector(".profile__name");
  const descriptionOutput = document.querySelector(".profile__description");
  nameOutput.textContent = nameValue;
  descriptionOutput.textContent = descriptionValue;
  close();
}
formElementProfile.addEventListener("submit", formSubmitEdit);
//открытие попап для добавления карточки
const popupAdd = document.querySelector(".popup_type_add");
const buttonAddOpen = document.querySelector(".profile__button_act_add");
buttonAddOpen.addEventListener("click", function () {
  popupAdd.classList.add("popup_opened");
});
//закрытие попап добавления карточки
const buttonAddClose = document.querySelector("#close");
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
  deleteForm(); //очистить форму
}
buttonAddClose.addEventListener("click", closePopupAdd);

const imageOpen = document.querySelector('.popup_type_image');
const imageOpeninPopup = imageOpen.querySelector('.popup__images');
const imageInPopup = imageOpen.querySelector('.popup__image');
const imageClose = imageOpen.querySelector('#active_img');
//функция создания карточки (возвращает созданную разметку карточки)
const container = document.querySelector(".content"); //тег main
const placeContainer = container.querySelector(".places"); //секция, где должны быть карточки
function cardCreate(cardName, cardLink) {
  const cardTemplate = document.querySelector("#card_template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDesc = cardElement.querySelector(".card__description");
  cardDesc.textContent = cardName;
  cardImage.alt = cardName;
  cardImage.src = cardLink;
  const cardLike = cardElement.querySelector(".card__like");
  //слушатель на лайк
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_pos_active");
  });
  const cardTrash = cardElement.querySelector(".card__trash");
  //слушатель на удаление
  cardTrash.addEventListener("click", function () {
    cardElement.remove();
  });

cardImage.addEventListener('click', function() {
    imageOpeninPopup.textContent = cardName;
    imageInPopup.alt = cardName;
    imageInPopup.src = cardLink;
    imageOpen.addEventListener("click", function () {
  document.querySelector(".popup").classList.add("popup_opened");
});
});

  return cardElement;
};

//функция добавления карточки в попап
const formElementLocation = document.querySelector("#location");
const locationInput = formElementLocation.querySelector(
  ".form__item_type_location"
);
const linkInput = formElementLocation.querySelector(".form__item_type_link");
const popupForm = popupAdd.querySelector(".form");
function formSubmitAdd(evt) {
  evt.preventDefault();
  const locationValue = locationInput.value;
  const linkValue = linkInput.value;
  const locationOutput = document.querySelector(".card__description");
  const linkOutput = document.querySelector(".card__image");
  locationOutput.textContent = locationValue;
  linkOutput.src = linkValue;
  linkOutput.alt = linkValue;
  closePopupAdd();
  deleteForm(); //очистить форму
}
formElementLocation.addEventListener("submit", formSubmitAdd);
//функция для очистки формы
function deleteForm() {
  linkInput.value = "";
  locationInput.value = "";
}
// функция добавления карточки в разметку
function renderCard(card_name, card_link) {
  placeContainer.prepend(cardCreate(card_name, card_link));
};

function cardsList() {
  initialCards.forEach(function (card) {
    renderCard(card.name, card.link);
  });
}
cardsList();
