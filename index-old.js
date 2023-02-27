console.log("hello!");
// Кнопка редактировать профиль
const editProfileButton = document.querySelector(".profile__edit-btn");
const editPopup = document.querySelector("#popup_type_edit");
if (!editProfileButton) {
  throw new Error("No editProfileButton");
}
// Срабатывание кнопки
editProfileButton.addEventListener("click", function () {
  //   editPopup.classList.remove("popup_type_edit");
  openPopup(editPopup);
});
function openPopup(popup) {
  popup.classList.remove("popup_type_edit");
}
//Закрытие редактирования профиля
const popupCloseButton = document.querySelector("#popup__close-button");
popupCloseButton.addEventListener("click", function () {
  //   editPopup.classList.add("popup_type_edit");
  closePopup(editPopup);
});
function closePopup(popup) {
  popup.classList.add("popup_type_edit");
}

// Имя и о себе, создание через JS

// const user = {
//     name: 'Жак-Ив Кусто',
//     occupation: 'Исследователь окенов',
// };

const userName = "Жак-Ив Кусто";
const userOccupation = "Исследователь окенов";

const userNameElement = document.querySelector("#user-name");
userNameElement.textContent = userName;

const userOccupationElement = document.querySelector("#user-occupation");
userOccupationElement.textContent = userOccupation;

const nameInput = document.querySelector("#name-input");
nameInput.value = userName;

const occupationInput = document.querySelector("#occupation-input");
occupationInput.value = userOccupation;

//сохранение имя и текст
// nameInput.addEventListener("input", function (event) {
//   const value = event.target.value;
//   userNameElement.textContent = value;
// });

// occupationInput.addEventListener("input", function (event) {
//   const value = event.target.value;
//   userOccupationElement.textContent = value;
// });

//сохраненить имя и текст

let jobInput = document.querySelector(".popup__input_text_job");
let form = editPopup.querySelector(".popup__fields");

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userOccupation.textContent = jobInput.value;
  closePopup();
}
