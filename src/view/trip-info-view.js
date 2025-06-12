import AbstractView from '../framework/view/abstract-view.js';
import { getTripTitle, calculateTotalPrice } from '../utils/trip.js';
import { formatDate, formatDateRange } from '../utils/date.js';
export default class TripInfoView extends AbstractView {
  constructor(events = [], destinations = [], offers = []) {
    super();
    this._events = events;
    this._destinations = destinations;
    this._offers = offers;
  }

  get template() {
    if (!this._events.length) {
      return '<div class="trip-info"></div>';
    }

    const sortedEvents = [...this._events].sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
    const startDate = sortedEvents[0].dateFrom;
    const endDate = sortedEvents[sortedEvents.length - 1].dateTo;

    return `
      <section class="trip-main__trip-info trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${getTripTitle(sortedEvents, this._destinations)}</h1>
          <p class="trip-info__dates">${formatDateRange(startDate, endDate)}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">
            ${calculateTotalPrice(this._events, this._offers)}
          </span>
        </p>
      </section>
    `;
  }
}