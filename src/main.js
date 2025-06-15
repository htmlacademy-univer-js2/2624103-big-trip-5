import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import { DESTINATIONS, OFFERS, EVENTS } from './mock';

document.addEventListener('DOMContentLoaded', () => {
  const tripMainContainer = document.querySelector('.trip-main');
  const tripEventsContainer = document.querySelector('.trip-events');
  
  if (!tripMainContainer || !tripEventsContainer) {
    return;
  }

  const destinationsModel = new DestinationsModel();
  const offersModel = new OffersModel();
  const eventsModel = new EventsModel();

  destinationsModel.setDestinations(DESTINATIONS);
  offersModel.setOffers(OFFERS);
  eventsModel.setEvents(EVENTS);

  eventsModel.setDestinationsModel(destinationsModel);
  eventsModel.setOffersModel(offersModel);

  const tripPresenter = new TripPresenter(
    {
      eventsContainer: tripEventsContainer,
      mainContainer: tripMainContainer
    },
    eventsModel,
    destinationsModel,
    offersModel
  );
  
  tripPresenter.init();
});