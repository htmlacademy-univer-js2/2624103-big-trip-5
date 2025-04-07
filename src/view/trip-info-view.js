import AbstractView from './abstract-view.js';
import { formatDate } from '../utils/date.js';
import { getTripTitle, calculateTotalPrice } from '../utils/trip.js';

export default class TripInfoView extends AbstractView {
  #events = null;
  #destinations = null;

  constructor({ events, destinations }) {
    super();
    this.#events = events;
    this.#destinations = destinations;
  }

  get template() {
    if (!this.#events.length) {
      return '<div></div>';
    }

    const sortedEvents = [...this.#events].sort((a, b) => a.dateFrom - b.dateFrom);
    const startDate = sortedEvents[0].dateFrom;
    const endDate = sortedEvents[sortedEvents.length - 1].dateTo;

    return `
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getTripTitle(sortedEvents, this.#destinations)}</h1>
          <p class="trip-info__dates">${formatDate(startDate)}&nbsp;&mdash;&nbsp;${formatDate(endDate)}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(this.#events)}</span>
        </p>
      </section>
    `;
  }
}