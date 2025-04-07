import {createElement} from '../render';

export default class SortView {
  constructor(currentSortType) {
    this._currentSortType = currentSortType;
    this._element = null;
  }

  getTemplate() {
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--day">
          <input 
            id="sort-day" 
            class="trip-sort__input  visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="day"
            ${this._currentSortType === 'day' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-day">Day</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--event">
          <input 
            id="sort-event" 
            class="trip-sort__input  visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="event" 
            disabled
          >
          <label class="trip-sort__btn" for="sort-event">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--time">
          <input 
            id="sort-time" 
            class="trip-sort__input  visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="time"
            ${this._currentSortType === 'time' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-time">Time</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--price">
          <input 
            id="sort-price" 
            class="trip-sort__input  visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="price"
            ${this._currentSortType === 'price' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-price">Price</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--offer">
          <input 
            id="sort-offer" 
            class="trip-sort__input  visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="offer" 
            disabled
          >
          <label class="trip-sort__btn" for="sort-offer">Offers</label>
        </div>
      </form>
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