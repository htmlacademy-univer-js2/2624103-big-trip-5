import Model from './model/model';
import TripPresenter from './presenter/trip-presenter';

const eventsModel = new Model();
const destinationsModel = new Model();
const offersModel = new Model();


Promise.all([
  eventsModel.init(),
  destinationsModel.init(),
  offersModel.init()
]).then(() => {
  const tripMainContainer = document.querySelector('.trip-main');
  
  const tripPresenter = new TripPresenter(
    tripMainContainer,
    eventsModel,
    destinationsModel,
    offersModel
  );
  
  tripPresenter.init();
}).catch((error) => {
  console.error('', error);
});