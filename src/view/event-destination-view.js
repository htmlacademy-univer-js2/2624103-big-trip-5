import AbstractView from './abstract-view.js';

export default class EventOfferView extends AbstractView {
  #offer = null;
  #isSelected = false;

  constructor(offer, isSelected) {
    super();
    this.#offer = offer;
    this.#isSelected = isSelected;
  }

  get template() {
    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox visually-hidden" 
               id="event-offer-${this.#offer.id}" 
               type="checkbox" 
               name="event-offer" 
               value="${this.#offer.id}"
               ${this.#isSelected ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${this.#offer.id}">
          <span class="event__offer-title">${this.#offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${this.#offer.price}</span>
        </label>
      </div>
    `;
  }
}

