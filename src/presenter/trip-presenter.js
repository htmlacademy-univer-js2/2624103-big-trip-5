import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import TripInfoView from '../view/trip-info-view';
import NewEventButtonView from '../view/new-event-button-view';
import EmptyListView from '../view/empty-list-view';
import {DEFAULT_EVENT} from '../const';
import EventPresenter from './event-presenter';
import {render, replace} from '../render';

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export default class TripPresenter {
 #newEventForm = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsContainer = null;
  #mainContainer = null;
  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;
  #tripInfoComponent = null;
  #filtersComponent = null;
  #sortComponent = null;
  #newEventButtonComponent = null;
  #currentEventComponent = null;
  #currentEditForm = null;
 #isNewEventFormOpen = false;
  constructor(containers, eventsModel, destinationsModel, offersModel) {
    if (!containers.eventsContainer || !containers.mainContainer) {
      throw new Error('Containers not provided');
    }
    this.#eventsContainer = containers.eventsContainer;
    this.#mainContainer = containers.mainContainer;
    this.#eventsModel = eventsModel; 
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    
   
  }
  
  init() {
    console.log('Trip container:', this.#eventsContainer);
    console.log('List element:', this.#eventsContainer.querySelector('.trip-events__list'));
    console.log('Проверка данных:', {
      events: this.#eventsModel.getEvents(), 
      destinations: this.#destinationsModel.getDestinations(),
      offers: this.#offersModel.getOffers()
    });
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderSort();
    this.#renderEventsList();
    this.#renderNewEventButton();
  }

#renderEvent(event) {
  const eventsListElement = this.#eventsContainer.querySelector('.trip-events__list');
  if (!eventsListElement) return;

  const eventPresenter = new EventPresenter({
    container: eventsListElement,
    destinationsModel: this.#destinationsModel,
    offersModel: this.#offersModel,
    onDataChange: this.#handleEventChange, 
    onModeChange: this.#handleModeChange
  });
  
  eventPresenter.init(event);
  this.#eventPresenters.set(event.id, eventPresenter);
}

   #renderEventsList() {
    const eventsListElement = this.#eventsContainer.querySelector('.trip-events__list');
    if (!eventsListElement) {
      console.error('Events list container not found');
      return;
    }

    eventsListElement.innerHTML = '';
    const events = this.#getSortedEvents();
    
    if (events.length === 0) {
      render(new EmptyListView(), eventsListElement);
      return;
    }
    
    events.forEach(event => {
      this.#renderEvent(event);
    });
  }

  #renderTripInfo() {
    const events = this.#eventsModel.getEvents();
    const destinations = this.#destinationsModel.getDestinations();
    
    this.#tripInfoComponent = new TripInfoView(events, destinations);
    const container = this.#mainContainer.querySelector('.trip-main__trip-info');
    
    if (!container) {
      console.error('Trip info container not found');
      return;
    }
    
    container.innerHTML = '';
    render(this.#tripInfoComponent, container);
  }

#renderNewEventButton() {
  try {
    if (this.#newEventButtonComponent) {
      remove(this.#newEventButtonComponent);
      this.#newEventButtonComponent = null;
    }
    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventClick
    });
    render(this.#newEventButtonComponent, this.#mainContainer);
    console.log('New event button rendered successfully');
  } catch (error) {
    console.error('Error rendering new event button:', error);
  }
}
  #renderFilters() {
    const filtersContainer = this.#eventsContainer.querySelector('.trip-controls__filters');
    if (!filtersContainer) return;
    
    filtersContainer.innerHTML = '';
    const filters = [
      { type: 'everything', name: 'Everything', count: this.#eventsModel.getEvents().length },
      { type: 'future', name: 'Future', count: this.#eventsModel.getFutureEvents().length },
      { type: 'past', name: 'Past', count: this.#eventsModel.getPastEvents().length }
    ];
    
    this.#filtersComponent = new FiltersView(filters, 'everything');
    render(this.#filtersComponent, filtersContainer); 
  }

  #renderSort() {
    const sortContainer = this.#eventsContainer.querySelector('.trip-events__trip-sort');
    if (!sortContainer) return;
    
    sortContainer.innerHTML = '';
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, sortContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach(presenter => presenter.destroy());
    this.#eventPresenters.clear();
    
    const list = this.#eventsContainer.querySelector('.trip-events__list'); 
    if (list) list.innerHTML = '';
  }

 #getSortedEvents() {
  switch (this.#currentSortType) {
    case SortType.TIME:
      return this.#eventsModel.getEventsSortedByTime();
    case SortType.PRICE:
      return this.#eventsModel.getEventsSortedByPrice();
    default: 
      return this.#eventsModel.getEventsSortedByDay();
  }
}

#handleEventChange = (updatedEvent, isDeleting = false) => {
  if (isDeleting) {
    console.log('Deleting event:', updatedEvent); 
    this.#eventsModel.deleteEvent(updatedEvent);
  } else {
    console.log('Updating event:', updatedEvent); 
    this.#eventsModel.updateEvent(updatedEvent);
  }
  
  const presenter = this.#eventPresenters.get(updatedEvent.id);
  if (presenter) {
    presenter.init(updatedEvent);
  }
};


  #handleModeChange = () => {
    this.#eventPresenters.forEach(presenter => presenter.resetView());
  };

    #handleSortTypeChange = (sortType) => {

    if (this.#currentSortType === sortType) {
      return;
    }
    
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEventsList();
  };
  #handleNewEventClick = () => {

    this.#eventPresenters.forEach(presenter => presenter.resetView());
    
    const eventsListElement = this.#eventsContainer.querySelector('.trip-events__list');
    if (!eventsListElement) return;
    
    this.#isNewEventFormOpen = true;
    this.#newEventButtonComponent.setDisabled(true);
    
    this.#newEventForm = new EventEditView(
      DEFAULT_EVENT,
      this.#destinationsModel,
      this.#offersModel
    );
    
    this.#newEventForm.setCloseHandler(() => this.#closeNewEventForm());
    this.#newEventForm.setSubmitHandler((newEvent) => {
      this.#eventsModel.addEvent(newEvent);
      this.#closeNewEventForm();
    });
    
    eventsListElement.prepend(this.#newEventForm.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

#escKeyDownHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    
    if (this.#isNewEventFormOpen) {
      this.#closeNewEventForm();
    } else {
      this.#eventPresenters.forEach(presenter => {
        if (presenter.isEditFormOpen()) {
          presenter.resetView();
        }
      });
    }
  }
};


#closeNewEventForm = () => {
  if (this.#newEventForm) {
    this.#newEventForm.removeElement();
    this.#newEventForm = null;
    this.#isNewEventFormOpen = false;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#newEventButtonComponent.setDisabled(false);
    this.#renderEventsList();
  }
};

  #replaceFormToEvent() {
    if (!this.#currentEventComponent || !this.#currentEditForm) return;
    
    replace(this.#currentEventComponent, this.#currentEditForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#currentEditForm = null;
    this.#currentEventComponent = null;
    this.#renderEventsList();
  }
}