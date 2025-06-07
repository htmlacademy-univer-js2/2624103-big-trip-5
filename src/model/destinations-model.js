export default class DestinationsModel {
  constructor() {
    this._destinations = [];
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationById(id) {
    return this._destinations.find(destination => destination.id === id);
  }

  setDestinations(destinations) {
    this._destinations = destinations;
  }
}