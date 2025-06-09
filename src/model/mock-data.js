const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Amsterdam', 'Geneva', 'Chamonix', 'Saint Petersburg', 'Tokyo', 'Osaka', 'Kyoto', 'New York', 'Paris', 'Berlin'];
const LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.'
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayItem = (array) => array[getRandomInt(0, array.length - 1)];

const generateOffers = () => EVENT_TYPES.flatMap((type) => {
  const count = getRandomInt(2, 5);
  return Array(count).fill().map((_, i) => ({
    id: `${type}-${i}`,
    title: `${type} option ${i + 1}`,
    price: getRandomInt(20, 200),
    type
  }));
});

const generateDestinations = () => CITIES.map((city, index) => ({
  id: `dest-${index}`,
  name: city,
  description: Array(getRandomInt(1, 3))
    .fill()
    .map(() => getRandomArrayItem(LOREM_IPSUM))
    .join(' '),
  pictures: Array(getRandomInt(1, 5)).fill().map((_, i) => ({
    src: `https://loremflickr.com/300/200/${city}?random=${getRandomInt(1, 100)}`,
    description: `${city} ${i + 1}`
  }))
}));

const generateTripEvents = (destinations, offers) => {
  const count = getRandomInt(5, 15);
  return Array(count).fill().map((_, i) => {
    const type = getRandomArrayItem(EVENT_TYPES);
    const destination = getRandomArrayItem(destinations);
    const basePrice = getRandomInt(50, 1000);
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() + getRandomInt(-10, 10));
    dateFrom.setHours(getRandomInt(0, 23), getRandomInt(0, 59));
    
    const dateTo = new Date(dateFrom);
    dateTo.setHours(dateFrom.getHours() + getRandomInt(1, 12));
    
    const typeOffers = offers.filter((offer) => offer.type === type);
    const offerIds = typeOffers
      .slice(0, getRandomInt(0, typeOffers.length))
      .map((offer) => offer.id);

    return {
      id: `event-${i}`,
      type,
      destinationId: destination.id,
      startDate: dateFrom.toISOString(),
      endDate: dateTo.toISOString(),
      basePrice,
      offerIds,
      isFavorite: Math.random() > 0.7
    };
  });
};

export const generateMockData = () => {
  const offers = generateOffers();
  const destinations = generateDestinations();
  const tripEvents = generateTripEvents(destinations, offers);
  
  return { offers, destinations, tripEvents };
};