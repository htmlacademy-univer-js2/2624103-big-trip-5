import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { EVENT_TYPES, DEFAULT_EVENT } from '../const';
import { formatDate, formatTime } from '../utils/date';

const FormError = {
  DESTINATION: 'Please select a valid destination from the list',
  PRICE: 'Price must be a positive number',
  DATES: 'End date must be after start date'
};

export default class EventEditView extends AbstractStatefulView {
  constructor(event = DEFAULT_EVENT, destinationsModel, offersModel) {
    super();
    this._state = EventEditView.parseEventToState(event);
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._callback = {
      submit: () => {},
      close: () => {},
      delete: () => {}
    };

    this.#setHandlers();
  }
  
  static parseEventToState(event) {
    return {
      ...event,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.isDisabled;
    delete event.isSaving;
    delete event.isDeleting;
    return event;
  }

  get template() {
    const {type, destination, dateFrom, dateTo, basePrice, offers} = this._state;
    const destinationData = this._destinationsModel.getDestinationById(destination);
    const typeOffers = this._offersModel.getOffersByType(type);

    return `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <!-- Поле выбора типа -->
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

            <!-- Поле выбора пункта назначения -->
            <div class="event__field-group event__field-group--destination">
              <label class="event__label event__type-output" for="event-destination">
                ${type}
              </label>
              <input class="event__input event__input--destination" id="event-destination" 
                type="text" name="event-destination" value="${destinationData?.name || ''}" 
                list="destination-list" required>
              <datalist id="destination-list">
                ${this._destinationsModel.getDestinations().map((d) => `
                  <option value="${d.name}"></option>
                `).join('')}
              </datalist>
            </div>

            <!-- Даты -->
            <div class="event__field-group event__field-group--time">
              <label class="visually-hidden" for="event-start-time">From</label>
              <input class="event__input event__input--time" id="event-start-time" 
                type="text" name="event-start-time" value="${formatDate(dateFrom)} ${formatTime(dateFrom)}" required>
              &mdash;
              <label class="visually-hidden" for="event-end-time">To</label>
              <input class="event__input event__input--time" id="event-end-time" 
                type="text" name="event-end-time" value="${formatDate(dateTo)} ${formatTime(dateTo)}" required>
            </div>

            <!-- Цена -->
            <div class="event__field-group event__field-group--price">
              <label class="event__label" for="event-price">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input event__input--price" id="event-price" 
                type="number" name="event-price" value="${basePrice}" min="1" required>
            </div>

            <!-- Кнопки -->
            <button class="event__save-btn btn btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Close event</span>
            </button>
          </header>

          <!-- Детали -->
          <section class="event__details">
            <!-- Офферы -->
            ${typeOffers.length > 0 ? `
              <section class="event__section event__section--offers">
                <h3 class="event__section-title event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${typeOffers.map((offer) => `
                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}" 
                        type="checkbox" name="event-offer" value="${offer.id}" 
                        ${offers.includes(offer.id) ? 'checked' : ''}>
                      <label class="event__offer-label" for="event-offer-${offer.id}">
                        <span class="event__offer-title">${offer.title}</span>
                        +€&nbsp;<span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>
                  `).join('')}
                </div>
              </section>
            ` : ''}

            <!-- Описание пункта назначения -->
            ${destinationData?.description ? `
              <section class="event__section event__section--destination">
                <h3 class="event__section-title event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${destinationData.description}</p>
                
                ${destinationData.pictures?.length > 0 ? `
                  <div class="event__photos-container">
                    ${destinationData.pictures.map((pic) => `
                      <img class="event__photo" src="${pic.src}" alt="${pic.description}">
                    `).join('')}
                  </div>
                ` : ''}
              </section>
            ` : ''}
          </section>
        </form>
      </li>
    `;
  }


  _restoreHandlers() {
    this.#setHandlers();
  }

  #setHandlers() {

    this.element.querySelector('.event__type-list')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('[name="event-start-time"]')
      .addEventListener('change', this.#dateFromChangeHandler);
    this.element.querySelector('[name="event-end-time"]')
      .addEventListener('change', this.#dateToChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);


    const offerInputs = this.element.querySelectorAll('.event__offer-checkbox');
    offerInputs.forEach((input) => {
      input.addEventListener('change', this.#offerChangeHandler);
    });


    this.element.querySelector('.event__save-btn')
      .addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);


    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeHandler);


    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #typeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #dateFromChangeHandler = (evt) => {
    this.updateElement({ dateFrom: new Date(evt.target.value) });
  };

  #dateToChangeHandler = (evt) => {
    this.updateElement({ dateTo: new Date(evt.target.value) });
  };

  #priceChangeHandler = (evt) => {
    this.updateElement({ basePrice: parseInt(evt.target.value, 10) });
  };

  #offerChangeHandler = (evt) => {
    const offerId = parseInt(evt.target.value, 10);
    const offers = this._state.offers.includes(offerId)
      ? this._state.offers.filter((id) => id !== offerId)
      : [...this._state.offers, offerId];

    this.updateElement({ offers });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    if (!this.#validateForm()) {
      return;
    }
    const eventData = this.#prepareEventData();
    this._callback.submit(eventData);
  };

  #validateForm() {
    const { destination, basePrice, dateFrom, dateTo } = this._state;
    const destinationData = this._destinationsModel.getDestinationById(destination);
    if (!destinationData) {
      return false;
    }
    if (basePrice <= 0 || isNaN(basePrice)) {
      return false;
    }
    if (dateTo <= dateFrom) {
      return false;
    }
    return true;
  }

  #prepareEventData() {
    const state = { ...this._state };
    const destinationData = this._destinationsModel.getDestinationById(state.destination);
    return {
      ...state,
      destination: destinationData.id, 
      offers:state.offers.map(offer=>offer.id||offer) 
    };
  }

  #destinationChangeHandler = (evt) => {
    const destinationName = evt.target.value;
    const destination = this._destinationsModel.getDestinations()
      .find(dest => dest.name === destinationName);
    if (!destination) {
      return;
    }

    this.updateElement({
      destination: destination.id
    });
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    if (this._callback.close) {
      this._callback.close();
    }
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.delete(this._state.id);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      evt.stopPropagation();
      this.#closeHandler(evt);
    }
  };

  #closeHandler = (evt) => {
    evt?.preventDefault();
    this._callback.close();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  setCloseHandler(callback) {
    this._callback.close = callback;
    return this;
  }

  setSubmitHandler(callback) {
    this._callback.submit = callback;
    return this;
  }

  setDeleteHandler(callback) {
    this._callback.delete = callback;
    return this;
  }

  removeElement() {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    super.removeElement();
  }

}