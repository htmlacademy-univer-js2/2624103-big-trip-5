import TripPresenter from './presenter/trip-presenter'; 
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

const tripMainContainer = document.querySelector('.trip-main');
const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripPresenter = new TripPresenter(
  tripMainContainer,
  eventsModel,
  destinationsModel,
  offersModel
);
tripPresenter.init();

document.addEventListener('DOMContentLoaded', () => {
  const tripMainContainer = document.querySelector('.trip-main');
  if (!tripMainContainer) {
    console.error('Контейнер .trip-main не найден!');
    return;
  }
  
  const tripPresenter = new TripPresenter(
    tripMainContainer,
    new EventsModel(),
    new DestinationsModel(),
    new OffersModel()
  );
  tripPresenter.init();
});