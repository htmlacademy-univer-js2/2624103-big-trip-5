import {render, RenderPosition} from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import NewEventButtonView from '../view/new-event-button-view';
import EmptyListView from '../view/empty-list-view';
import {DEFAULT_EVENT} from '../const';

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export default class TripPresenter {
  constructor(tripContainer, eventsModel, destinationsModel, offersModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    
    this._currentSortType = SortType.DAY;
    this._tripInfoComponent = null;
    this._filtersComponent = null;
    this._sortComponent = null;
    this._newEventButtonComponent = null;
    
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleNewEventClick = this._handleNewEventClick.bind(this);
  }

  init() {
    this._renderTripInfo();
    this._renderFilters();
    this._renderSort();
    this._renderEventsList();
    this._renderNewEventButton();
  }

  _renderTripInfo() {
    const container = this._tripContainer.querySelector('.trip-main__trip-info');
    const events = this._eventsModel.getEvents();
    const destinations = this._destinationsModel.getDestinations();
    
    container.innerHTML = '';
    this._tripInfoComponent = new TripInfoView(events, destinations);
    render(this._tripInfoComponent, container);
  }

  _renderFilters() {
    
   const filtersContainer = this._tripContainer.querySelector('.trip-controls__filters');
  if (!filtersContainer) {
    console.error('Фильтры: контейнер не найден');
    return;
  }
  
  filtersContainer.innerHTML = '';
    const filters = [
      {type: 'everything', name: 'Everything', count: this._eventsModel.getEvents().length},
      {type: 'future', name: 'Future', count: this._eventsModel.getFutureEvents().length},
      {type: 'present', name: 'Present', count: this._eventsModel.getPresentEvents().length},
      {type: 'past', name: 'Past', count: this._eventsModel.getPastEvents().length}
    ];
    
    container.innerHTML = '';
    this._filtersComponent = new FiltersView(filters, 'everything');
    render(this._filtersComponent, container);
  }

  _renderSort() {
    const container = this._tripContainer.querySelector('.trip-sort-container');
    
    container.innerHTML = '';
    this._sortComponent = new SortView(this._currentSortType);
    render(this._sortComponent, container);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

 _renderEventsList() {
    const eventsListElement = this._tripContainer.querySelector('.trip-events__list');
    eventsListElement.innerHTML = '';

    if (this._eventsModel.getEvents().length === 0) {
      render(new EmptyListView(), eventsListElement);
      return;
    }

   
    render(
      new EventEditView(
        this._eventsModel.getEvents()[0],
        this._destinationsModel.getDestinations(),
        this._offersModel.getOffers()
      ),
      eventsListElement
    );

    
    this._eventsModel.getEvents().slice(1, 3).forEach((event) => {
      render(new EventView(event), eventsListElement);
    });
  }
  _renderNewEventButton() {
    const container = this._tripContainer.querySelector('.trip-main');
    
    this._newEventButtonComponent = new NewEventButtonView();
    render(this._newEventButtonComponent, container);
    this._newEventButtonComponent.getElement()
      .addEventListener('click', this._handleNewEventClick);
  }

  _handleSortTypeChange(sortType) {
    this._currentSortType = sortType;
    this._clearEventsList();
    this._renderEventsList();
  }

  _handleNewEventClick() {
    const eventsListElement = this._tripContainer.querySelector('.trip-events__list');
    eventsListElement.innerHTML = '';

    render(
      new EventEditView(
        DEFAULT_EVENT,
        this._destinationsModel.getDestinations(),
        this._offersModel.getOffers()
      ),
      eventsListElement
    );
  }

  _clearEventsList() {
    this._tripContainer.querySelector('.trip-events__list').innerHTML = '';
  }

  _sortEvents(sortType) {
    const events = this._eventsModel.getEvents();
    switch (sortType) {
      case SortType.TIME:
        return [...events].sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
      case SortType.PRICE:
        return [...events].sort((a, b) => b.basePrice - a.basePrice);
      default: // DAY
        return [...events].sort((a, b) => a.dateFrom - b.dateFrom);
    }
  }
}