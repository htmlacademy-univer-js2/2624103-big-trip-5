import {createElement} from '../render';
import {formatDate, formatTime} from '../utils/date';
import {EVENT_TYPES} from '../const';

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
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${EVENT_TYPES.map((eventType) => `
                    <div class="event__type-item">
                      <input 
                        id="event-type-${eventType}-1" 
                        class="event__type-input  visually-hidden" 
                        type="radio" 
                        name="event-type" 
                        value="${eventType}"
                        ${type === eventType ? 'checked' : ''}
                      >
                      <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">
                        ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                      </label>
                    </div>
                  `).join('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input 
                class="event__input  event__input--destination" 
                id="event-destination-1" 
                type="text" 
                name="event-destination" 
                value="${destinationData?.name || ''}" 
                list="destination-list-1"
                required
              >
              <datalist id="destination-list-1">
                ${this._destinations.map((d) => `
                  <option value="${d.name}"></option>
                `).join('')}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input 
                class="event__input  event__input--time" 
                id="event-start-time-1" 
                type="text" 
                name="event-start-time" 
                value="${formatDate(dateFrom)} ${formatTime(dateFrom)}"
                required
              >
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input 
                class="event__input  event__input--time" 
                id="event-end-time-1" 
                type="text" 
                name="event-end-time" 
                value="${formatDate(dateTo)} ${formatTime(dateTo)}"
                required
              >
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input 
                class="event__input  event__input--price" 
                id="event-price-1" 
                type="number" 
                name="event-price" 
                value="${basePrice}" 
                min="0"
                required
              >
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Close event</span>
            </button>
          </header>

          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${typeOffers.map((offer) => `
                  <div class="event__offer-selector">
                    <input 
                      class="event__offer-checkbox  visually-hidden" 
                      id="event-offer-${offer.id}" 
                      type="checkbox" 
                      name="event-offer" 
                      value="${offer.id}"
                      ${offers.includes(offer.id) ? 'checked' : ''}
                    >
                    <label class="event__offer-label" for="event-offer-${offer.id}">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>
                `).join('')}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              ${destinationData?.description ? `
                <p class="event__destination-description">${destinationData.description}</p>
              ` : ''}
              
              ${destinationData?.pictures?.length > 0 ? `
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${destinationData.pictures.map((picture) => `
                      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </section>
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