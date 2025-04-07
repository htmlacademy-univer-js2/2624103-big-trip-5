import {render, RenderPosition} from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import NewEventButtonView from '../view/new-event-button-view';
import {DEFAULT_EVENT} from '../const';

export default class TripPresenter {
  constructor(tripContainer, eventsModel, destinationsModel, offersModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    
    this._tripInfoComponent = null;
    this._filtersComponent = null;
    this._sortComponent = null;
    this._newEventButtonComponent = null;
    
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
    const events = this._eventsModel.getEvents();
    const destinations = this._destinationsModel.getDestinations();
    
    this._tripInfoComponent = new TripInfoView(events, destinations);
    render(this._tripInfoComponent, this._tripContainer, RenderPosition.AFTERBEGIN);
  }

  _renderFilters() {
    const filters = [
      {type: 'everything', name: 'Everything', count: this._eventsModel.getEvents().length},
      {type: 'future', name: 'Future', count: this._eventsModel.getFutureEvents().length},
      {type: 'past', name: 'Past', count: this._eventsModel.getPastEvents().length}
    ];
    
    this._filtersComponent = new FiltersView(filters, 'everything');
    render(this._filtersComponent, this._tripContainer.querySelector('.trip-controls__filters'));
  }

  _renderSort() {
    this._sortComponent = new SortView('day');
    render(this._sortComponent, this._tripContainer.querySelector('.trip-events'), RenderPosition.AFTERBEGIN);
  }

  _renderEventsList() {
    const eventsListElement = this._tripContainer.querySelector('.trip-events__list');
    const events = this._eventsModel.getEvents();
    const destinations = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();

  
    render(
      new EventEditView(events[0], destinations, offers),
      eventsListElement
    );

    
    events.slice(0, 3).forEach((event) => {
      render(
        new EventView(event),
        eventsListElement
      );
    });
  }

  _renderNewEventButton() {
    this._newEventButtonComponent = new NewEventButtonView();
    render(
      this._newEventButtonComponent, 
      this._tripContainer.querySelector('.trip-main')
    );
    
    this._newEventButtonComponent.getElement()
      .addEventListener('click', this._handleNewEventClick);
  }

  _handleNewEventClick() {
    const eventsListElement = this._tripContainer.querySelector('.trip-events__list');
    const destinations = this._destinationsModel.getDestinations();
    const offers = this._offersModel.getOffers();
    
    render(
      new EventEditView(DEFAULT_EVENT, destinations, offers),
      eventsListElement,
      RenderPosition.AFTERBEGIN
    );
    
    this._newEventButtonComponent.getElement().disabled = true;
  }
}