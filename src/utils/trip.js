export const getTripTitle = (events = [], destinations = []) => {
  if (!events.length || !destinations.length) {
    return 'No destinations';
  }

  const getCityById = (id) => destinations.find((d) => d.id === id)?.name || 'Unknown';
  const uniqueCities = [...new Set(events.map((e) => getCityById(e.destination)).filter(Boolean))];

  if (!uniqueCities.length) {
    return 'No valid destinations';
  }

  return uniqueCities.length <= 3
    ? uniqueCities.join(' — ')
    : `${uniqueCities[0]} — ... — ${uniqueCities[uniqueCities.length - 1]}`;
};

export const calculateTotalPrice = (events = [], offers = []) => {
  if (!events.length) {
    return 0;
  }

  return events.reduce((total, event) => {
    const eventTypeOffers = offers.find((o) => o.type === event.type)?.offers || [];
    const selectedOffersPrice = (event.offers || []).reduce((sum, offerId) => {
      const offer = eventTypeOffers.find((o) => o.id === offerId);
      return sum + (offer?.price || 0);
    }, 0);

    return total + (event.basePrice || 0) + selectedOffersPrice;
  }, 0);
};
