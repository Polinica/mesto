/**
 * Элементы страницы и их селекторы
 */
// Контейнер с карточками
export const cardsSelector = ".cards";
export const cardTemplateSelector = "#card";

// Общие элементы форм
export const formSelector = ".popup__form";
export const inputSelector = ".popup__input";
export const submitButtonSelector = ".popup__save-button";
export const inactiveButtonClass = "popup__save-button_disabled";
export const inputErrorClass = "popup__input_type_error";
export const errorClass = "popup__input-error_active";

/** Элементы страницы */ // Редаткирование информации о пользователе
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");
export const profileEditButton = document.querySelector(
  ".profile__button_type_edit"
);
export const profileEditPopupSelector = ".popup_type_edit-profile";
const profileEditPopupElement = document.querySelector(
  profileEditPopupSelector
);

//export const profileEditForm = profileEditPopup.querySelector(".popup__form");
export const profileNameInput = profileEditPopupElement.querySelector(
  ".popup__input_type_name"
);
export const profileJobInput = profileEditPopupElement.querySelector(
  ".popup__input_type_job"
);

// Добавление новых карточек
export const newCardPopupSelector = ".popup_type_add-card";
export const newCardPopupElement = document.querySelector(newCardPopupSelector);
export const newCardButton = document.querySelector(
  ".profile__button_type_add"
);
export const newCardForm = newCardPopupElement.querySelector(formSelector);
//export const newCardTitle = newCardPopup.querySelector(
//  ".popup__input_type_title"
//);
// export const newCardLink = newCardPopup.querySelector(
//   ".popup__input_type_link"
// );

// Попап с увеличенным изображением
export const imagePopupSelector = ".popup_type_image";
// export const imagePopupFigure = imagePopup.querySelector(".popup__image");
// export const imagePopupCaption = imagePopup.querySelector(
//   ".popup__image-caption"
// );

// export const popupCloseButtons = document.querySelectorAll(
//   ".popup__cancel-button"
// );

// export const popups = document.querySelectorAll(".popup");
