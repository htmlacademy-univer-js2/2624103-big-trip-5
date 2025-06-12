import { generateDestinations } from './destinations.js';
import { generateOffers } from './offers.js';
import { generateEvents } from './events.js';

const DESTINATIONS = generateDestinations();
const OFFERS = generateOffers();
const EVENTS = generateEvents(15, DESTINATIONS); 

export { DESTINATIONS, OFFERS, EVENTS };