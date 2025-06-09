import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { formatDate, formatTime, calculateDuration } from '../utils/date.js';

export default class EventView extends AbstractStatefulView {
  constructor(event, destinationsModel, offersModel) {
    super();
    console.log('EventView created for event:', event.id);
    this._state = { ...event };
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._callback = {};
    this.#setHandlers();
  }
  get template() {
    const { type, destination, dateFrom, dateTo, basePrice, isFavorite, offers } = this._state;
  
  // Если destination уже объект (из EventsModel)
  const destinationData = typeof destination === 'object' 
    ? destination 
    : this._destinationsModel.getDestinationById(destination);

  if (!destinationData) {
    console.error(`Destination data not found for:`, destination);
    return '<div class="error">Invalid destination</div>';
  }
    const typeOffers = this._offersModel.getOffersByType(type);
    const selectedOffers = typeOffers.filter(offer => this._state.offers.includes(offer.id));

    return `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${dateFrom.toISOString()}">${formatDate(dateFrom)}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" 
                 src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${destinationData.name}</h3>
          
          <div class="event__schedule">
            <p class="event__time">
              <time datetime="${dateFrom.toISOString()}">${formatTime(dateFrom)}</time>
              &mdash;
              <time datetime="${dateTo.toISOString()}">${formatTime(dateTo)}</time>
            </p>
            <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
          </div>
          
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          
          ${selectedOffers.length > 0 ? `
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${selectedOffers.map(offer => `
                <li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
          
          <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `;
  }

 #setHandlers() {
  const rollupBtn = this.element.querySelector('.event__rollup-btn');
  const favoriteBtn = this.element.querySelector('.event__favorite-btn');
  
  if (!rollupBtn || !favoriteBtn) {
    console.error('Кнопки не найдены:', { rollupBtn, favoriteBtn });
    return;
  }

  rollupBtn.addEventListener('click', this.#rollupClickHandler);
  favoriteBtn.addEventListener('click', this.#favoriteClickHandler);
}

 
  _restoreHandlers() {
    this.#setHandlers();
  }

 #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick?.();
  };
  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };

   setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    return this;
  }

 setRollupClickHandler(callback) {
    this._callback.rollupClick = callback;
    return this;
  }
 
    setEditClickHandler(callback) {
    this._callback.editClick = callback;
    return this;
  }

  
}