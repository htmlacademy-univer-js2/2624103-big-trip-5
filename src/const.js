export const EVENT_TYPES = [
  'taxi', 'bus', 'train', 'ship', 
  'drive', 'flight', 'check-in', 
  'sightseeing', 'restaurant'
];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

export const DEFAULT_EVENT = {
  id: '0',
  type: 'flight',
  destination: '',
  dateFrom: new Date(),
  dateTo: new Date(),
  basePrice: 0,
  offers: [],
  isFavorite: false
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};