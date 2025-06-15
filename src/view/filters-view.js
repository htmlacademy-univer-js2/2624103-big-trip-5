import AbstractView from '../framework/view/abstract-view.js';

export default class FiltersView extends AbstractView {
  constructor(filters, currentFilter) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this._filters.map((filter) => `
          <div class="trip-filters__filter">
            <input 
              id="filter-${filter.type}" 
              class="trip-filters__filter-input visually-hidden" 
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
      </form>
    `;
  }
}

