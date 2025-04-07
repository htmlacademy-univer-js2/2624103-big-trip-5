import { generateMockData } from './mock-data.js';

export default class Model {
  constructor() {
    this._tripEvents = [];
    this._destinations = [];
    this._offers = [];
    this._init();
  }

  _init() {
    const mockData = generateMockData();
    this._tripEvents = this._sortEvents(mockData.tripEvents);
    this._destinations = mockData.destinations;
    this._offers = mockData.offers;
  }

  getTripEvents() {
    return this._tripEvents;
  }

  getOffersByType(type) {
    return this._offers.find((offerGroup) => offerGroup.type === type)?.offers || [];
  }

  getDestinationById(id) {
    return this._destinations.find((destination) => destination.id === id);
  }

  getOffersByIds(ids) {
    return this._offers.filter((offer) => ids.includes(offer.id));
  }

  updateTripEvent(updatedEvent) {
    this._tripEvents = this._sortEvents(
      this._tripEvents.map((event) => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }

  deleteTripEvent(id) {
    this._tripEvents = this._tripEvents.filter((event) => event.id !== id);
  }

  addTripEvent(event) {
    this._tripEvents = this._sortEvents([...this._tripEvents, event]);
  }

  _sortEvents(events) {
    return events.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }
}