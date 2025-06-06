import AbstractStatefulView from './abstract-stateful-view.js';
import { formatDate, formatTime } from '../utils/date.js';
import { EVENT_TYPES } from '../const.js';

export default class EventEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;

  constructor({ event, destinations, offers, onFormSubmit, onDeleteClick, onCloseClick }) {
    super();
    this._state = EventEditView.parseEventToState(event);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;

    this._restoreHandlers();
  }

  get template() {
    const { type, destination, dateFrom, dateTo, basePrice, offers, isFavorite } = this._state;
    const destinationData = this.#destinations.find((d) => d.id === destination);
    const typeOffers = this.#offers.find((o) => o.type === type)?.offers || [];

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            ${this.#renderTypeSelector(type)}
            ${this.#renderDestinationSelector(destinationData)}
            ${this.#renderTimeFields(dateFrom, dateTo)}
            ${this.#renderPriceField(basePrice)}
            ${this.#renderButtons()}
            ${this.#renderFavoriteButton(isFavorite)}
          </header>
          <section class="event__details">
            ${this.#renderOffersSection(typeOffers, offers)}
            ${this.#renderDestinationSection(destinationData)}
          </section>
        </form>
      </li>
    `;
  }

  #renderTypeSelector(currentType) {
    return `
      <div class="event__type-wrapper">
        <label class="event__type event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${currentType}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${EVENT_TYPES.map((type) => `
              <div class="event__type-item">
                <input id="event-type-${type}-1" class="event__type-input visually-hidden" 
                       type="radio" name="event-type" value="${type}"
                       ${type === currentType ? 'checked' : ''}>
                <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">
                  ${type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              </div>
            `).join('')}
          </fieldset>
        </div>
      </div>
    `;
  }

  #renderDestinationSelector(destination) {
    return `
      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-1">
          ${this._state}
        </label>
        <input class="event__input event__input--destination" id="event-destination-1" 
               type="text" name="event-destination" value="${destination?.name || ''}" 
               list="destination-list-1" required>
        <datalist id="destination-list-1">
          ${this.#destinations.map((d) => `
            <option value="${d.name}"></option>
          `).join('')}
        </datalist>
      </div>
    `;
  }

  #renderTimeFields(dateFrom, dateTo) {
    return `
      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input event__input--time" id="event-start-time-1" 
               type="text" name="event-start-time" 
               value="${formatDate(dateFrom)} ${formatTime(dateFrom)}" required>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input event__input--time" id="event-end-time-1" 
               type="text" name="event-end-time" 
               value="${formatDate(dateTo)} ${formatTime(dateTo)}" required>
      </div>
    `;
  }

  #renderPriceField(price) {
    return `
      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price" id="event-price-1" 
               type="number" name="event-price" value="${price}" min="0" required>
      </div>
    `;
  }

  #renderButtons() {
    return `
      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
      </button>
    `;
  }

  #renderFavoriteButton(isFavorite) {
    return `
      <input id="event-favorite-1" class="event__favorite-checkbox visually-hidden" 
             type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>
    `;
  }

  #renderOffersSection(offers, selectedOffers) {
    if (!offers.length) {
      return '';
    }

    return `
      <section class="event__section event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => `
            <div class="event__offer-selector">
              <input class="event__offer-checkbox visually-hidden" 
                     id="event-offer-${offer.id}" type="checkbox" 
                     name="event-offer" value="${offer.id}"
                     ${selectedOffers.includes(offer.id) ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${offer.id}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  #renderDestinationSection(destination) {
    if (!destination) {
      return '';
    }

    return `
      <section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        ${destination.description ? `
          <p class="event__destination-description">${destination.description}</p>
        ` : ''}
        ${destination.pictures?.length ? `
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((pic) => `
                <img class="event__photo" src="${pic.src}" alt="${pic.description}">
              `).join('')}
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }
  static parseEventToState(event) {
    return { ...event };
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseEventToState(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #parseFormData() {
    const form = this.element;
    return {
      ...this._state,
      type: form.querySelector('input[name="event-type"]:checked').value,
      destination: this.#findDestinationId(form.querySelector('input[name="event-destination"]').value),
      dateFrom: new Date(form.querySelector('input[name="event-start-time"]').value),
      dateTo: new Date(form.querySelector('input[name="event-end-time"]').value),
      basePrice: parseInt(form.querySelector('input[name="event-price"]').value),
      offers: Array.from(form.querySelectorAll('input[name="event-offer"]:checked')).map(input => input.value),
      isFavorite: form.querySelector('input[name="event-favorite"]')?.checked || false
    };
  }

  #findDestinationId(name) {
    const destination = this.#destinations.find((d) => d.name === name);
    return destination ? destination.id : '';
  }
  
}