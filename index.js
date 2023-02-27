// POPUP
let profileEdit = document.querySelector(".profile__edit-btn"),
  profileName = document.querySelector(".profile__name-title"),
  profileSubtitle = document.querySelector(".profile__subtitle"),
  popupProfileEdit = document.querySelector(".popup"),
  closeInput = popupProfileEdit.querySelector(".popup__close"),
  nameInput = popupProfileEdit.querySelector(".popup__input_text_name"),
  jobInput = popupProfileEdit.querySelector(".popup__input_text_job"),
  form = popupProfileEdit.querySelector(".popup__fields");

// Кнопка редактировать профиль
function openToClick() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupProfileEdit.classList.add("popup__opened");
  console.log(popupProfileEdit);
}

//Закрытие редактирования профиля
function closeToClick() {
  popupProfileEdit.classList.remove("popup__opened");
}

//сохраненить имя и текст
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeToClick();
}

form.addEventListener("submit", handleFormSubmit);
profileEdit.addEventListener("click", openToClick);
closeInput.addEventListener("click", closeToClick);
