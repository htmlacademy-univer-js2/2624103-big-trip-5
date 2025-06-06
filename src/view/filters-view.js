import {createElement} from '../render';

export default class FiltersView {
  constructor(filters, currentFilter) {
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._element = null;
  }

getTemplate() {
  return `
    <form class="trip-filters" action="#" method="get">
      ${this._filters.map((filter) => `
        <div class="trip-filters__filter">
          <input 
            id="filter-${filter.type}" 
            class="trip-filters__filter-input  visually-hidden" 
            type="radio" 
            name="trip-filter" 
            value="${filter.type}"
            ${filter.type === this._currentFilter ? 'checked' : ''}
            ${filter.count === 0 ? 'disabled' : ''}
          >
          <label class="trip-filters__filter-label" for="filter-${filter.type}">
            ${filter.name} ${filter.count > 0 ? `(${filter.count})` : ''}
          </label>
        </div>
      `).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
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