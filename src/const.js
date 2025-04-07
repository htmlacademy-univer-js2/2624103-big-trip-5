export const EVENT_TYPES = [
    'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 
    'check-in', 'sightseeing', 'restaurant'
  ];
  
  export const DEFAULT_EVENT = {
    type: 'flight',
    destination: null,
    dateFrom: new Date(),
    dateTo: new Date(),
    basePrice: 0,
    offers: [],
    isFavorite: false
  };