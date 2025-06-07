import TripPresenter from './presenter/trip-presenter'; 
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';

document.addEventListener('DOMContentLoaded', () => {
  const tripMainContainer = document.querySelector('.trip-main');
  if (!tripMainContainer) {
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