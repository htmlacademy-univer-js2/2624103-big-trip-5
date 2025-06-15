import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  constructor({ onClick, isDisabled = false }) {
    super();
    this._onClick = onClick;
    this._isDisabled = isDisabled;

    this.element.addEventListener('click', this._clickHandler);
  }

  get template() {
    return `
      <button 
        class="trip-main__event-add-btn btn btn--big btn--yellow" 
        type="button"
        ${this._isDisabled ? 'disabled' : ''}
      >
        <span class="visually-hidden">New event</span>New event
      </button>
    `;
  }

  _clickHandler = (evt) => {
    evt.preventDefault();
    this._onClick();
  };

  setDisabled(isDisabled) {
    this._isDisabled = isDisabled;
    this.element.disabled = isDisabled;
  }
}

