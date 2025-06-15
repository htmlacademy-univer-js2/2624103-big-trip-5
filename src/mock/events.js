export const EVENTS = [
  {
    id: '1',
    type: 'taxi',
    destination: 'ams',
    dateFrom: '2024-06-10T10:00:00',
    dateTo: '2024-06-10T11:00:00',
    basePrice: 50,
    offers: [1],
    isFavorite: false
  },
  {
    id: '2',
    type: 'flight',
    destination: 'gva',
    dateFrom: '2024-06-10T10:00:00',
    dateTo: '2024-06-10T11:00:00',
    basePrice: 200,
    offers: [1, 2],
    isFavorite: true
  },
  {
    id: '3',
    type: 'drive',
    destination: 'chx',
    dateFrom: '2024-06-10T10:00:00',
    dateTo: '2024-06-10T11:00:00',
    basePrice: 300,
    offers: [2],
    isFavorite: false
  }
];

import { generateRandomDate } from '../utils/date.js';

export const generateEvents = (count, destinations) => {
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
  
  return Array.from({ length: count }, (_, index) => {
    const dateFrom = generateRandomDate();
    const dateTo = new Date(dateFrom.getTime() + Math.random() * 48 * 60 * 60 * 1000);
    
    return {
      id: index + 1,
      type: types[Math.floor(Math.random() * types.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)].id,
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      basePrice: Math.floor(Math.random() * 500) + 50,
      offers: Array.from({ length: Math.floor(Math.random() * 3) }, (_, j) => j + 1),
      isFavorite: Math.random() > 0.7
    };
  });
};