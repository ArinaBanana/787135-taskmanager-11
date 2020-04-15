import {createElement} from "../utils/utils";

const createButtonLoadTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class ButtonLoad {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createButtonLoadTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
