import {createElement} from '../render';
import {EVENT_TYPES, DESTINATION_NAMES} from '../const';
import {formatDate, formatTime} from '../utils/date';

export default class EventEditView {
  constructor(event, destinations, offers) {
    this._event = event;
    this._destinations = destinations;
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    const {type, destination, dateFrom, dateTo, basePrice, offers} = this._event;
    const destinationData = this._destinations.find((d) => d.id === destination);
    const typeOffers = this._offers.find((o) => o.type === type)?.offers || [];

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type event__type-btn" for="event-type-toggle">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle visually-hidden" id="event-type-toggle" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${EVENT_TYPES.map((eventType) => `
                    <div class="event__type-item">
                      <input id="event-type-${eventType}" class="event__type-input visually-hidden" 
                        type="radio" name="event-type" value="${eventType}" ${type === eventType ? 'checked' : ''}>
                      <label class="event__type-label event__type-label--${eventType}" for="event-type-${eventType}">
                        ${eventType}
                      </label>
                    </div>
                  `).join('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group event__field-group--destination">
              <label class="event__label event__type-output" for="event-destination">
                ${type}
              </label>
              <input class="event__input event__input--destination" id="event-destination" 
                type="text" name="event-destination" value="${destinationData?.name || ''}" list="destination-list" required>
              <datalist id="destination-list">
                ${DESTINATION_NAMES.map((name) => `
                  <option value="${name}"></option>
                `).join('')}
              </datalist>
            </div>

            <div class="event__field-group event__field-group--time">
              <label class="visually-hidden" for="event-start-time">From</label>
              <input class="event__input event__input--time" id="event-start-time" 
                type="text" name="event-start-time" value="${formatDate(dateFrom)} ${formatTime(dateFrom)}" required>
              &mdash;
              <label class="visually-hidden" for="event-end-time">To</label>
              <input class="event__input event__input--time" id="event-end-time" 
                type="text" name="event-end-time" value="${formatDate(dateTo)} ${formatTime(dateTo)}" required>
            </div>

            <div class="event__field-group event__field-group--price">
              <label class="event__label" for="event-price">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input event__input--price" id="event-price" 
                type="number" name="event-price" value="${basePrice}" min="1" required>
            </div>

            <button class="event__save-btn btn btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Close event</span>
            </button>
          </header>

          <section class="event__details">
            <section class="event__section event__section--offers">
              <h3 class="event__section-title event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${typeOffers.map((offer) => `
                  <div class="event__offer-selector">
                    <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" 
                      type="checkbox" name="event-offer" value="${offer.id}" ${offers.includes(offer.id) ? 'checked' : ''}>
                    <label class="event__offer-label" for="event-offer-${offer.id}">
                      <span class="event__offer-title">${offer.title}</span>
                      +€&nbsp;<span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>
                `).join('')}
              </div>
            </section>

            ${destinationData?.description ? `
              <section class="event__section event__section--destination">
                <h3 class="event__section-title event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${destinationData.description}</p>
              </section>
            ` : ''}
          </section>
        </form>
      </li>
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