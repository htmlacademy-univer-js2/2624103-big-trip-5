import { render, RenderPosition } from '../render';
import FiltersView from '../view/filters-view';
import SortView from '../view/sort-view';
import EventEditView from '../view/event-edit-view';
import EventView from '../view/event-view';
import TripInfoView from '../view/trip-info-view';
import NewEventButtonView from '../view/new-event-button-view';
import { DEFAULT_EVENT, FilterType, SortType } from '../const';

export default class TripPresenter {
  #tripContainer = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripInfoComponent = null;
  #filtersComponent = null;
  #sortComponent = null;
  #newEventButtonComponent = null;
  #currentFilter = FilterType.EVERYTHING;
  #currentSort = SortType.DAY;

  constructor(tripContainer, eventsModel, destinationsModel, offersModel) {
    this.#tripContainer = tripContainer;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderSort();
    this.#renderEventsList();
    this.#renderNewEventButton();
  }

  #renderTripInfo() {
    const events = this.#eventsModel.getEvents();
    const destinations = this.#destinationsModel.getDestinations();
    
    this.#tripInfoComponent = new TripInfoView({
      events,
      destinations
    });
    
    render(this.#tripInfoComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    const events = this.#eventsModel.getEvents();
    
    const filters = [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: events.length
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: this.#eventsModel.getFutureEvents().length
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: this.#eventsModel.getPastEvents().length
      }
    ];
    
    this.#filtersComponent = new FiltersView({
      filters,
      currentFilter: this.#currentFilter,
      onFilterChange: this.#handleFilterTypeChange
    });
    
    render(
      this.#filtersComponent,
      this.#tripContainer.querySelector('.trip-controls__filters')
    );
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSort,
      onSortTypeChange: this.#handleSortTypeChange
    });
    
    render(
      this.#sortComponent,
      this.#tripContainer.querySelector('.trip-events'),
      RenderPosition.AFTERBEGIN
    );
  }

  #renderEventsList() {
    const eventsListElement = this.#tripContainer.querySelector('.trip-events__list');
    const events = this.#getSortedEvents(this.#getFilteredEvents());
    const destinations = this.#destinationsModel.getDestinations();
    const offers = this.#offersModel.getOffers();

  
    const firstEvent = events[0];
    if (firstEvent) {
      render(
        new EventEditView({
          event: firstEvent,
          destinations,
          offers,
          onFormSubmit: this.#handleEventUpdate,
          onDeleteClick: this.#handleEventDelete,
          onCloseClick: this.#handleCloseEditForm
        }),
        eventsListElement
      );
    }

    
    events.slice(1, 4).forEach((event) => {
      render(
        new EventView({
          event,
          destination: this.#destinationsModel.getDestinationById(event.destination),
          offers: this.#offersModel.getOffersByType(event.type)
            .filter((offer) => event.offers.includes(offer.id)),
          onEditClick: () => this.#handleEditClick(event),
          onFavoriteClick: () => this.#handleFavoriteToggle(event)
        }),
        eventsListElement
      );
    });
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventClick
    });
    
    render(
      this.#newEventButtonComponent,
      this.#tripContainer.querySelector('.trip-main')
    );
  }

  #getFilteredEvents() {
    switch (this.#currentFilter) {
      case FilterType.FUTURE:
        return this.#eventsModel.getFutureEvents();
      case FilterType.PAST:
        return this.#eventsModel.getPastEvents();
      default:
        return this.#eventsModel.getEvents();
    }
  }

  #getSortedEvents(events) {
    switch (this.#currentSort) {
      case SortType.TIME:
        return [...events].sort((a, b) => (b.dateTo - b.dateFrom) - (a.dateTo - a.dateFrom));
      case SortType.PRICE:
        return [...events].sort((a, b) => b.basePrice - a.basePrice);
      default:
        return [...events].sort((a, b) => a.dateFrom - b.dateFrom);
    }
  }

  #handleFilterTypeChange = (filterType) => {
    this.#currentFilter = filterType;
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSort = sortType;
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #handleNewEventClick = () => {
    const eventsListElement = this.#tripContainer.querySelector('.trip-events__list');
    
    render(
      new EventEditView({
        event: DEFAULT_EVENT,
        destinations: this.#destinationsModel.getDestinations(),
        offers: this.#offersModel.getOffers(),
        onFormSubmit: this.#handleEventAdd,
        onDeleteClick: this.#handleCloseEditForm,
        onCloseClick: this.#handleCloseEditForm
      }),
      eventsListElement,
      RenderPosition.AFTERBEGIN
    );
    
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleEditClick = (event) => {
    const eventsListElement = this.#tripContainer.querySelector('.trip-events__list');
    const eventElement = eventsListElement.querySelector(`[data-id="${event.id}"]`);
    
    if (eventElement) {
      replace(
        new EventEditView({
          event,
          destinations: this.#destinationsModel.getDestinations(),
          offers: this.#offersModel.getOffers(),
          onFormSubmit: this.#handleEventUpdate,
          onDeleteClick: this.#handleEventDelete,
          onCloseClick: this.#handleCloseEditForm
        }),
        eventElement
      );
    }
  };

  #handleFavoriteToggle = (event) => {
    this.#eventsModel.updateEvent({
      ...event,
      isFavorite: !event.isFavorite
    });
  };

  #handleEventUpdate = (updatedEvent) => {
    this.#eventsModel.updateEvent(updatedEvent);
    this.#clearEventsList();
    this.#renderEventsList();
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleEventAdd = (newEvent) => {
    this.#eventsModel.addEvent(newEvent);
    this.#clearEventsList();
    this.#renderEventsList();
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleEventDelete = (eventId) => {
    this.#eventsModel.deleteEvent(eventId);
    this.#clearEventsList();
    this.#renderEventsList();
    this.#newEventButtonComponent.element.disabled = false;
  };

  #handleCloseEditForm = () => {
    this.#clearEventsList();
    this.#renderEventsList();
    this.#newEventButtonComponent.element.disabled = false;
  };

  #clearEventsList() {
    const eventsListElement = this.#tripContainer.querySelector('.trip-events__list');
    eventsListElement.innerHTML = '';
  }
}