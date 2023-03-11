/** Исходные карточки для загрузки */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element").content;

function renderCards(container, ...elements) {
  elements.forEach((element) => {
    container.prepend(getNewCard(element.name, element.link));
  });
}

/** Функция создает из шаблона элемент с новой карточкой и возвращает его */
function getNewCard(name, link) {
  // Создание элемента из шаблона
  const card = cardTemplate.querySelector(".element").cloneNode(true);

  // Заполнение содержимого
  card.querySelector(".element__image").src = link;
  card.querySelector(".element__image").alt = name;
  card.querySelector(".element__title").textContent = name;

  return card;
}
//________________________________________________________________________________________

// POPUP
let profileEdit = document.querySelector(".profile__edit-btn"),
  profileName = document.querySelector(".profile__name-title"),
  profileSubtitle = document.querySelector(".profile__subtitle"),
  // popup_type_edit
  popupProfileEdit = document.querySelector(".popup_type_edit"),
  closeInput = popupProfileEdit.querySelector(".popup__close"),
  nameInput = popupProfileEdit.querySelector(".popup__input_text_name"),
  jobInput = popupProfileEdit.querySelector(".popup__input_text_job"),
  formEdit = popupProfileEdit.querySelector(".popup__form_edit");

// Кнопка редактировать профиль
function openToClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupProfileEdit.classList.add("popup_opened");
}

//Закрытие редактирования профиля
function closeToClick() {
  popupProfileEdit.classList.remove("popup_opened");
}

//сохраннить имя и текст
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeToClick();
}

formEdit.addEventListener("submit", handleFormSubmit);
profileEdit.addEventListener("click", openToClick);
closeInput.addEventListener("click", closeToClick);

/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);
