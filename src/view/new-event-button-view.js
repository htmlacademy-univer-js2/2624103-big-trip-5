import {createElement} from '../render';

export default class NewEventButtonView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
        <span class="visually-hidden">New event</span>+ New event
      </button>
    `;
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