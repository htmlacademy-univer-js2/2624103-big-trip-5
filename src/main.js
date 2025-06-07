import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import EventEditView from './view/event-edit-view'; 
import { render } from './render'; 
import { DESTINATIONS, OFFERS, EVENTS } from './mock';

document.addEventListener('DOMContentLoaded', () => {
  const tripMainContainer = document.querySelector('.trip-main');
  if (!tripMainContainer) {
    console.error('Контейнер .trip-main не найден!');
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
  tripMainContainer,
  eventsModel,
  destinationsModel,
  offersModel
);
tripPresenter.init();

const testEvent = eventsModel.getEvents()[0];
const testForm = new EventEditView(
  testEvent,
  destinationsModel,
  offersModel
);

const testContainer = document.querySelector('.trip-events__list');
testContainer.classList.add('trip-events__list');
document.querySelector('.trip-events').appendChild(testContainer);
 render(
    new EventEditView(testEvent, destinationsModel, offersModel),
    testContainer
  );

console.log('Тестовая форма отображена. Проверьте:', {
  event: testEvent,
  formData: testForm.getTemplate()
});


});