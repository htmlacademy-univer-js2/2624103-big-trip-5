
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import NewEventButtonView from '../view/new-event-button-view';
import EmptyListView from '../view/empty-list-view';
import {DEFAULT_EVENT} from '../const';
import {render, replace, RenderPosition} from '../render';
const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export default class TripPresenter {
_currentEventComponent = null;
_currentEditForm = null;
constructor(containers, eventsModel, destinationsModel, offersModel) {
  if (!containers.eventsContainer || !containers.mainContainer) {
    throw new Error('Containers not provided');
  }
  this._eventsContainer = containers.eventsContainer;
  this._mainContainer = containers.mainContainer;
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
    

     this._currentEventComponent = null;
    this._currentEditForm = null;
  }
init() {
  console.log('Trip container:', this._eventsContainer);
  console.log('List element:', this._eventsContainer.querySelector('.trip-events__list'));
  console.log('Проверка данных:', {
    events: this._eventsModel.getEvents(), 
    destinations: this._destinationsModel.getDestinations(),
    offers: this._offersModel.getOffers()
  });
  this._renderTripInfo();
  this._renderFilters();
  this._renderSort();
  this._renderEventsList();
  this._renderNewEventButton();
}


showTestEditForm() {
  this._clearEventsList();
  const testEvent = this._eventsModel.getEvents()[0]; 
  render(
    new EventEditView(
      testEvent,
      this._destinationsModel,
      this._offersModel
    ),
    this._eventsContainer.querySelector('.trip-events__list')
  );
}
  _renderTripInfo() {
    this._tripInfoComponent = new TripInfoView(
  this._eventsModel.getEvents(),
  this._destinationsModel.getDestinations(),
  this._offersModel.getOffers()
);
    const container = this._mainContainer.querySelector('.trip-main__trip-info');
    if (!container) {
      console.error('Trip info container not found');
      return;
    }
    
    const events = this._eventsModel.getEvents();
    const destinations = this._destinationsModel.getDestinations();
    
    container.innerHTML = '';
    this._tripInfoComponent = new TripInfoView(events, destinations);
    render(this._tripInfoComponent, container);
  }

  _renderNewEventButton() {
    this._newEventButtonComponent = new NewEventButtonView();
    render(this._newEventButtonComponent, this._mainContainer);
    this._newEventButtonComponent.getElement()
      .addEventListener('click', this._handleNewEventClick);
  }

  _renderFilters() {
  const filtersContainer = this._eventsContainer.querySelector('.trip-controls__filters');
  if (!filtersContainer) {
    return;
  }
  filtersContainer.innerHTML = '';
  const filters = [
    { type: 'everything', name: 'Everything', count: this._eventsModel.getEvents().length },
    { type: 'future', name: 'Future', count: this._eventsModel.getFutureEvents().length },
    { type: 'past', name: 'Past', count: this._eventsModel.getPastEvents().length }
  ];
  this._filtersComponent = new FiltersView(filters, 'everything');
  render(this._filtersComponent, filtersContainer); 
}

  _renderSort() {
     const sortContainer = this._eventsContainer.querySelector('.trip-events__trip-sort');
    
    if (!sortContainer) {
    return;
  }
  sortContainer.innerHTML = '';
  this._sortComponent = new SortView(this._currentSortType);
  render(this._sortComponent, sortContainer);
  }

#escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' && this._editFormComponent) {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #replaceFormToEvent() {
    if (this._editFormComponent && this._eventComponent) {
      replace(this._eventComponent, this._editFormComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this._editFormComponent = null;
    }
  }

  _renderNewEventButton() {
     const container = this._eventsContainer.querySelector('.trip-main');
  if (!container) {
    return;
  } 
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
  this.#replaceFormToEvent(); 
    
    const eventsListElement = this._eventsContainer.querySelector('.trip-events__list');
    if (!eventsListElement) return;
    
    const newEventForm = new EventEditView(
      DEFAULT_EVENT,
      this._destinationsModel,
      this._offersModel
    );
    
    newEventForm.setCloseHandler(() => {
      this._renderEventsList();
    });
    
    eventsListElement.innerHTML = '';
    render(newEventForm, eventsListElement);
    this._editFormComponent = newEventForm;
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  _clearEventsList() {
   const list = this._eventsContainer.querySelector('.trip-events__list'); 
  if (list) list.innerHTML = '';
  }

  _getSortedEvents() {
  switch (this._currentSortType) {
    case SortType.TIME:
      return this._eventsModel.getEventsSortedByTime();
    case SortType.PRICE:
      return this._eventsModel.getEventsSortedByPrice();
    default: 
      return this._eventsModel.getEventsSortedByDay();
    }
  }
    _renderEventsList() {
  const eventsListElement = this._eventsContainer.querySelector('.trip-events__list');
  if (!eventsListElement) {
    console.error('Events list container not found');
    return;
  }

  eventsListElement.innerHTML = '';
  const events = this._getSortedEvents();
  console.log('Rendering events:', events); 

  events.forEach(event => {
    const eventComponent = new EventView(event, this._destinationsModel, this._offersModel);
    render(eventComponent, eventsListElement);
    const rollupBtn = eventComponent.element.querySelector('.event__rollup-btn');
    console.log('Rollup button exists:', !!rollupBtn);
    eventComponent.setRollupClickHandler(() => {
      console.log('Rollup clicked for event:', event.id);
      this._openEditForm(event, eventComponent);
    });
  });
}
 _openEditForm(event, eventComponent) {
  if (this._currentEditForm) {
    this._replaceFormToEvent();
  }

   const editFormComponent = new EventEditView(
    event,
    this._destinationsModel,
    this._offersModel
  );

  editFormComponent.setCloseHandler(() => this._replaceFormToEvent());
  editFormComponent.setSubmitHandler((updatedEvent) => { 
    this._handleEventChange(updatedEvent);
    this._replaceFormToEvent();
  });
  
  editFormComponent.setDeleteHandler((eventId) => {
    this._eventsModel.deleteEvent(eventId);
    this._renderTripInfo();
    this._renderEventsList();
  });

  this._currentEventComponent = eventComponent;
  this._currentEditForm = editFormComponent;

  replace(editFormComponent, eventComponent);
  document.addEventListener('keydown', this._escKeyDownHandler);
}


_handleEventChange(updatedEvent) {
  this._eventsModel.updateEvent(updatedEvent);
  this._renderTripInfo(); 
}

_replaceFormToEvent() {
  if (!this._currentEventComponent || !this._currentEditForm) return;
  
  replace(this._currentEventComponent, this._currentEditForm);
  document.removeEventListener('keydown', this._escKeyDownHandler);
  this._currentEditForm = null;
  this._currentEventComponent = null;
  this._renderEventsList();
}
_escKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' && this._currentEditForm) {
    evt.preventDefault();
    this._replaceFormToEvent();
  }
};

}