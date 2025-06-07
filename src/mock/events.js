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
    type: 'hotel',
    destination: 'chx',
     dateFrom: '2024-06-10T10:00:00', 
    dateTo: '2024-06-10T11:00:00',  
    basePrice: 300,
    offers: [2],
    isFavorite: false
  }
];