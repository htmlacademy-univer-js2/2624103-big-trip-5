export const EVENT_TYPES = [
  'taxi', 'bus', 'train', 'ship',
  'drive', 'flight', 'check-in',
  'sightseeing', 'restaurant'
];

export const DESTINATION_NAMES = [
  'Amsterdam', 'Chamonix', 'Geneva',
  'Paris', 'Berlin', 'Rome'
];

export const DEFAULT_EVENT = {
  type: 'flight',
  destination: 'geneva',
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + 3600000),
  basePrice: 100,
  offers: [1, 2],
  isFavorite: false
};
