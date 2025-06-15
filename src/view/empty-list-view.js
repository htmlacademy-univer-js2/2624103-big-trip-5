import AbstractView from '../framework/view/abstract-view.js';

export default class EmptyListView extends AbstractView {
  constructor(filterType = 'everything') {
    super();
    this._filterType = filterType;
  }

  get template() {
    const messages = {
      everything: 'Click New Event to create your first point',
      future: 'There are no future events now',
      past: 'There are no past events now',
      present: 'There are no present events now'
    };

    return `<p class="trip-events__msg">${messages[this._filterType]}</p>`;
  }
}
