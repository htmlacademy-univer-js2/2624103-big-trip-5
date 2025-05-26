import AbstractView from './abstract-view.js';

export default class TripCostView extends AbstractView {
  #cost = null;

  constructor(cost) {
    super();
    this.#cost = cost;
  }

  get template() {
    return `
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this.#cost}</span>
      </p>
    `;
  }
}