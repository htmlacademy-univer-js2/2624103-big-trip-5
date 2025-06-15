import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../render.js';

export default class EventPresenter {
  #event = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = 'DEFAULT';
  #isEditFormOpen = false;

  constructor({ container, destinationsModel, offersModel, onDataChange, onModeChange }) {
    if (!container) {
      throw new Error('Container not provided');
    }
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    this.#eventEditComponent = new EventEditView(
      this.#event,
      this.#destinationsModel,
      this.#offersModel
    );

    this.#eventEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteHandler(this.#handleDeleteClick);
    this.#eventEditComponent.setCloseHandler(this.#handleCloseClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
    } else {
      if (this.#mode === 'DEFAULT') {
        replace(this.#eventComponent, prevEventComponent);
      }

      if (this.#mode === 'EDITING') {
        replace(this.#eventEditComponent, prevEventEditComponent);
      }
    }

    this.#eventComponent.setRollupClickHandler(this.#handleEditClick);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#isEditFormOpen) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm = () => {
    const currentEventElement = this.#eventComponent.element;
    this.#eventEditComponent = new EventEditView(
      this.#event,
      this.#destinationsModel,
      this.#offersModel
    );
    this.#eventEditComponent.setSubmitHandler(this.#handleFormSubmit);
    this.#eventEditComponent.setDeleteHandler(this.#handleDeleteClick);
    this.#eventEditComponent.setCloseHandler(this.#handleCloseClick);
    currentEventElement.replaceWith(this.#eventEditComponent.element);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = 'EDITING';
    this.#isEditFormOpen = true;
  };

  #replaceFormToEvent = () => {
    if (this.#isEditFormOpen && this.#eventEditComponent) {
      const newEventComponent = new EventView({
        event: this.#event,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onEditClick: this.#handleEditClick,
        onFavoriteClick: this.#handleFavoriteClick
      });
      this.#eventEditComponent.element.replaceWith(newEventComponent.element);
      this.#eventComponent = newEventComponent;
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#mode = 'DEFAULT';
      this.#isEditFormOpen = false;
      this.#eventEditComponent = null;
    }
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      evt.stopPropagation();
      this.#handleCloseClick();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  isEditFormOpen() {
    return this.#mode === 'EDITING';
  }

  #handleFavoriteClick = (updatedEvent) => {
    this.#handleDataChange(updatedEvent);
  };

#handleFormSubmit = (updatedEvent) => {
  if (!updatedEvent.destination) {
    this.#eventEditComponent.shake();
    return;
  }
  const destination = this.#destinationsModel.getDestinationById(updatedEvent.destination);
  if (!destination) {
    this.#eventEditComponent.shake();
    return;
  }
  const fullUpdatedEvent = {
    ...this.#event,
    ...updatedEvent,
    destination: destination.id 
  };

  this.#handleDataChange(fullUpdatedEvent);
  this.#replaceFormToEvent();
};

  #handleDeleteClick = (eventId) => {
    this.#handleDataChange(eventId, true);
  };

  #handleCloseClick = () => {
    this.#replaceFormToEvent();
  };
}
