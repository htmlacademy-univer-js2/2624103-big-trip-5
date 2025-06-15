const parseDate = (dateInput) => {
  if (dateInput instanceof Date) {
    return isNaN(dateInput.getTime()) ? null : dateInput;
  }
  const date = new Date(dateInput);
  return isNaN(date.getTime()) ? null : date;
};

export const formatDate = (dateInput) => {
  const date = parseDate(dateInput);
  if (!date) {
    console.error('Invalid date input:', dateInput);
    return 'N/A';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (dateInput) => {
  const date = parseDate(dateInput);
  if (!date) {
    console.error('Invalid date input:', dateInput);
    return 'N/A';
  }

  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculateDuration = (dateFromInput, dateToInput) => {
  const dateFrom = parseDate(dateFromInput);
  const dateTo = parseDate(dateToInput);

  if (!dateFrom || !dateTo) {
    console.error('Invalid dates:', { dateFromInput, dateToInput });
    return 'N/A';
  }

  const diff = dateTo - dateFrom;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }
  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};
export const generateRandomDate = () => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  return new Date(pastDate.getTime() + Math.random() * (futureDate - pastDate));
};

export const formatDateRange = (dateFrom, dateTo) => {
  try {
    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    if (isNaN(start.getTime())) {
      throw new Error('Invalid start date');
    }
    if (isNaN(end.getTime())) {
      throw new Error('Invalid end date');
    }

    const startStr = formatDate(start);
    const endStr = formatDate(end);

    return startStr === endStr
      ? `${startStr}, ${formatTime(start)} – ${formatTime(end)}`
      : `${startStr} – ${endStr}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return 'N/A';
  }
};
