export default class EventsModel {
  constructor() {
    this._events = [
      {
        id: '1',
        type: 'taxi',
        destination: 'ams',
        dateFrom: new Date('2024-06-01T10:00'),
        dateTo: new Date('2024-06-01T11:00'),
        basePrice: 50,
        offers: [1, 2],
        isFavorite: true
      }
    ];
  }

  getEvents() {
    return this._events;
  }

  getFutureEvents() {
    return this._events.filter(event => event.dateFrom > new Date());
  }

  getPastEvents() {
    return this._events.filter(event => event.dateTo < new Date());
  }
  
  getPresentEvents() {
  const now = new Date();
  return this._events.filter(
    event => event.dateFrom <= now && event.dateTo >= now
  );
}
}