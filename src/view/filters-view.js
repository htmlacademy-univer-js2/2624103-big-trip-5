import AbstractView from './abstract-view.js';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor({ filters, currentFilter }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this.#filters.map((filter) => `
          <div class="trip-filters__filter">
            <input id="filter-${filter.type}" 
                   class="trip-filters__filter-input visually-hidden" 
                   type="radio" name="trip-filter" 
                   value="${filter.type}"
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

  setFilterChangeHandler(callback) {
    this.element.addEventListener('change', (evt) => {
      evt.preventDefault();
      callback(evt.target.value);
    });
  }
}