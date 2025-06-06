export default class DestinationsModel {
  constructor() {
    this._destinations = [
      {
        id: 'ams',
        name: 'Amsterdam',
        description: 'Красивый город с каналами',
        pictures: []
      }
    ];
  }

  getDestinations() {
    return this._destinations;
  }
}