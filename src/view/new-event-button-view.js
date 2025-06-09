import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return `
      <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">
        <span class="visually-hidden">New event</span>+ New event
      </button>
    `;
  }
}