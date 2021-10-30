const content = document.querySelector('.content');
const places = content.querySelector('.places');
const editButton = document.querySelector('.profile__button_act_edit');
const addButton = document.querySelector('.profile__button_act_add');


function addSong(nameValue, descriptionValue) {
  const profileTemplate = document.querySelector('#profile-template').content;
  const profileElement = profileTemplate.querySelector('.profile__info').cloneNode(true);

  profileElement.querySelector('.profile__name').textContent = nameValue;
  profileElement.querySelector('.profile__description').textContent = descriptionValue;
  /*лайки*/
  profileElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_pos_active');
  });
  places.append(profileElement);
}

addButton.addEventListener('click', function () {
  const name = document.querySelector('form__item_type_name');
  const description = document.querySelector('form__item_type_description');

  addProfile(name.value, description.value); /*добавить функцию наподобие addSong из примера*/ */
  renderHasSongs();/*добавить функцию наподобие renderHasSongs из примера*/

});

const initialCards = [
    {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1548288242-d454d4648b55?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80'
    },
    {
      name: 'Калининград',
      link: 'https://images.unsplash.com/photo-1572872750804-15c2b20473de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80'
    },
    {
      name: 'Санкт-Петербург',
      link: 'https://images.unsplash.com/photo-1577887789303-d2510cc5e562?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1565&q=80'
    },
    {
      name: 'Москва',
      link: 'https://images.unsplash.com/photo-1599343265703-0f5a075c49f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
    },
    {
      name: 'Минск',
      link: 'https://images.unsplash.com/photo-1591509352193-c3e6676f71c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];