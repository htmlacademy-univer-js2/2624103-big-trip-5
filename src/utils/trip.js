export const getTripTitle = (events, destinations) => {
    if (events.length === 0) return '';
    
    const destinationNames = events
      .map((event) => destinations.find((d) => d.id === event.destination)?.name)
      .filter(Boolean);
  
    if (destinationNames.length <= 3) {
      return destinationNames.join(' — ');
    }
  
    return `${destinationNames[0]} — ... — ${destinationNames[destinationNames.length - 1]}`;
  };
  
  export const calculateTotalPrice = (events) => {
    return events.reduce((total, event) => total + event.basePrice, 0);
  };