import {createElement} from '../render';
import {formatDate, getTripTitle, calculateTotalPrice} from '../utils/trip';

export default class TripInfoView {
  constructor(events, destinations) {
    this._events = events;
    this._destinations = destinations;
    this._element = null;
  }

  getTemplate() {
    if (this._events.length === 0) {
      return '<div></div>';
    }

    const sortedEvents = [...this._events].sort((a, b) => a.dateFrom - b.dateFrom);
    const startDate = sortedEvents[0].dateFrom;
    const endDate = sortedEvents[sortedEvents.length - 1].dateTo;

    return `
      <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getTripTitle(sortedEvents, this._destinations)}</h1>
          <p class="trip-info__dates">${formatDate(startDate)}&nbsp;&mdash;&nbsp;${formatDate(endDate)}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${calculateTotalPrice(this._events)}</span>
        </p>
      </section>
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