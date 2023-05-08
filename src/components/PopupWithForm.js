import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * Класс отвечает за работу с попапом, содержащим форму
   *
   * Параметры:
   * popupSelector - селектор элемента с попапом
   * handleSubmit - обработчик отправки формы
   */
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    //this._inputValues = {};

    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submit();
    });
  }

  _submit() {
    const button = this._form.querySelector(".popup__save-button");
    const tempText = "Сохранение...";
    const originalText = button.textContent;

    button.disabled = true;
    button.textContent = tempText;
    this._handleSubmit(this._getInputValues()).then(() => {
      button.textContent = originalText;
      button.disabled = false;
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
