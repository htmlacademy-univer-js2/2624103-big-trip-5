import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { DEFAULT_EVENT } from '../const';

export default class NewEventEditView extends AbstractStatefulView {
  constructor(destinationsModel, offersModel) {
    super();
    this._state = {
      ...DEFAULT_EVENT,
      isDisabled: false,
      isSaving: false
    };
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._callback = {
      submit: () => {},
      close: () => {}
    };

    this.#setHandlers();
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

  #destinationChangeHandler = (evt) => {
    const destination = this._destinationsModel.getDestinations()
      .find((dest) => dest.name === evt.target.value);

    if (destination) {
      this.updateElement({
        destination: destination.id
      });
    }
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
    this._callback.submit(NewEventEditView.parseStateToEvent(this._state));
  };

  static parseStateToEvent(state) {
    return {
      ...state,
      offers: state.offers.map((offer) => offer.id),
      destination: state.destination.id
    };
  }

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
