import AbstractView from '../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._callback = {}; 
  }

  get template() {
    return `
      <form class="trip-events__trip-sort trip-sort" action="#" method="get">
        ${Object.entries(SortType).map(([name, type]) => `
          <div class="trip-sort__item trip-sort__item--${type}">
            <input 
              id="sort-${type}" 
              class="trip-sort__input visually-hidden" 
              type="radio" 
              name="trip-sort" 
              value="${type}"
              ${this._currentSortType === type ? 'checked' : ''}
              data-sort-type="${type}"
            >
            <label class="trip-sort__btn" for="sort-${type}">${name}</label>
          </div>
        `).join('')}
      </form>
    `;
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    const sortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(sortType);
  };
}

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};