import AbstractView from './abstract-view.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterChange = null;

  constructor({ filters, currentFilter, onFilterChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this.#filters.map((filter) => `
          <div class="trip-filters__filter">
            <input id="filter-${filter.type}" class="trip-filters__filter-input visually-hidden" 
                   type="radio" name="trip-filter" value="${filter.type}"
                   ${filter.type === this.#currentFilter ? 'checked' : ''}
                   ${filter.count === 0 ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter.type}">
              ${filter.name} ${filter.count > 0 ? `(${filter.count})` : ''}
            </label>
          </div>
        `).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}