import {createElement} from '../render';

export default class SortView {
  constructor(currentSortType) {
    this._currentSortType = currentSortType;
    this._element = null;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  getTemplate() {
    return `
      <form class="trip-events__trip-sort trip-sort" action="#" method="get">
        <!-- Варианты сортировки -->
        <div class="trip-sort__item trip-sort__item--day">
          <input 
            id="sort-day" 
            class="trip-sort__input visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="day"
            ${this._currentSortType === 'day' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-day">Day</label>
        </div>

        <!-- Остальные варианты (time, price) -->
        <div class="trip-sort__item trip-sort__item--time">
          <input 
            id="sort-time" 
            class="trip-sort__input visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="time"
            ${this._currentSortType === 'time' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-time">Time</label>
        </div>

        <div class="trip-sort__item trip-sort__item--price">
          <input 
            id="sort-price" 
            class="trip-sort__input visually-hidden" 
            type="radio" 
            name="trip-sort" 
            value="price"
            ${this._currentSortType === 'price' ? 'checked' : ''}
          >
          <label class="trip-sort__btn" for="sort-price">Price</label>
        </div>
      </form>
    `;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._handleSortTypeChange);
  }

  _handleSortTypeChange(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._callback.sortTypeChange(evt.target.value);
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