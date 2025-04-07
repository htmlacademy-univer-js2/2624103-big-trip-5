import AbstractView from './abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return `
      <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">
        <span class="visually-hidden">New event</span>+ New event
      </button>
    `;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}