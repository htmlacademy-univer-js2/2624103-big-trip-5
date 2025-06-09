import AbstractView from '../framework/view/abstract-view.js';
import {formatDate, getTripTitle, calculateTotalPrice} from '../utils/trip';

export default class TripInfoView extends AbstractView {
  constructor(events, destinations) {
    super();
    this._events = events;
    this._destinations = destinations;
  }

  get template() {
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
}