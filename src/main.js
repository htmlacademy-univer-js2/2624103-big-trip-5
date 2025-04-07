const tripMainContainer = document.querySelector('.trip-main');
const tripPresenter = new TripPresenter(
  tripMainContainer,
  eventsModel,
  destinationsModel,
  offersModel
);
tripPresenter.init();
