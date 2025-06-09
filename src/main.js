import TripPresenter from './presenter/trip-presenter';
import EventsModel from './model/events-model';
import DestinationsModel from './model/destinations-model';
import OffersModel from './model/offers-model';
import { DESTINATIONS, OFFERS, EVENTS } from './mock';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Находим основные контейнеры
  const tripMainContainer = document.querySelector('.trip-main');
  const tripEventsContainer = document.querySelector('.trip-events');
  EVENTS.forEach(event => {
  if (!DESTINATIONS.some(d => d.id === event.destination)) {
    console.error(`Event ${event.id} has invalid destination: ${event.destination}`);
  }
});

// Проверка offers
EVENTS.forEach(event => {
  const typeOffers = OFFERS.find(o => o.type === event.type)?.offers || [];
  event.offers.forEach(offerId => {  
  if (!typeOffers.some(o => o.id === offerId)) {
    console.error(`Event ${event.id} has invalid offer ID: ${offerId}`);
  }
});
});

  // 2. Проверяем наличие контейнеров
  if (!tripMainContainer || !tripEventsContainer) {
    console.error('Ошибка: не найдены необходимые контейнеры');
    console.log('tripMainContainer:', tripMainContainer);
    console.log('tripEventsContainer:', tripEventsContainer);
    return;
  }

  // 3. Инициализация моделей
  const destinationsModel = new DestinationsModel();
  const offersModel = new OffersModel();
  const eventsModel = new EventsModel();

  // 4. Загрузка данных в модели
  try {
    destinationsModel.setDestinations(DESTINATIONS);
    offersModel.setOffers(OFFERS);
    eventsModel.setEvents(EVENTS);
    
    // 5. Связывание моделей
    eventsModel.setDestinationsModel(destinationsModel);
    eventsModel.setOffersModel(offersModel);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return;
  }

  // 6. Проверка данных перед инициализацией
  console.log('Проверка данных перед инициализацией:');
  console.log('Destinations:', destinationsModel.getDestinations());
  console.log('Offers:', offersModel.getOffers());
  console.log('Events:', eventsModel.getEvents());

  // 7. Инициализация презентера
  try {
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
  console.log('Презентер успешно инициализирован');
  } 
  
  catch (error) {
  console.error('Ошибка при инициализации презентера:', error)
  } 

});