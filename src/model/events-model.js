export default class EventsModel {
  constructor() {
    this._events = [];
    this._destinationsModel = null;
    this._offersModel = null;
  }

  setEvents(events) {
    this._events = events.map((event) => ({
      ...event,
      dateFrom: new Date(event.dateFrom),
      dateTo: new Date(event.dateTo)
    }));
  }

  setDestinationsModel(model) {
    this._destinationsModel = model;
  }

  setOffersModel(model) {
    this._offersModel = model;
  }

  getEvents() {
    return this._events.map((event) => {
      const destination = this._destinationsModel.getDestinationById(event.destination);
      if (!destination) {
        console.warn(`Destination not found for event ${event.id}: ${event.destination}`);
        return null;
      }
      return {
        ...event,
        destination: destination,
        offers: this._offersModel.getOffersByType(event.type)
          .filter((offer) => event.offers.includes(offer.id))
      };
    }).filter(Boolean);
  }

  addEvent(event) {
    this._events = [...this._events, event];
  }

  updateEvent(updatedEvent) {
    this._events = this._events.map((event) =>
      event.id === updatedEvent.id ? {...updatedEvent} : event
    );
  }

  deleteEvent(id) {
    this._events = this._events.filter((event) => event.id !== id);
  }

  getFutureEvents() {
    const now = new Date();
    return this.getEvents().filter((event) => new Date(event.dateFrom) > now);
  }

  getPastEvents() {
    const now = new Date();
    return this.getEvents().filter((event) => new Date(event.dateTo) < now);
  }

  getPresentEvents() {
    const now = new Date();
    return this.getEvents().filter((event) =>
      new Date(event.dateFrom) <= now && new Date(event.dateTo) >= now
    );
  }


  getEventsSortedByDay() {
    return [...this.getEvents()].sort((a, b) => a.dateFrom - b.dateFrom);
  }

  getEventsSortedByTime() {
    return [...this.getEvents()].sort((a, b) => {
      const durationA = a.dateTo - a.dateFrom;
      const durationB = b.dateTo - b.dateFrom;
      return durationB - durationA;
    });
  }

  getEventsSortedByPrice() {
    return [...this.getEvents()].sort((a, b) => b.basePrice - a.basePrice);
  }
}
