import {createElement} from '../render';

export default class EmptyListView {
  constructor(filterType = 'everything') {
    this._filterType = filterType;
    this._element = null;
  }

  getTemplate() {
    const messages = {
      everything: 'Click New Event to create your first point',
      future: 'There are no future events now',
      past: 'There are no past events now',
      present: 'There are no present events now'
    };

    return `
      <p class="trip-events__msg">${messages[this._filterType]}</p>
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