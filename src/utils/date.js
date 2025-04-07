// src/utils/date.js

export const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };
  
  export const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export const formatDateTime = (date) => {
    return date.toISOString().slice(0, 16);
  };
  
  export const calculateDuration = (startDate, endDate) => {
    const diff = endDate - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor (diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor (diff / (1000 * 60)) % 60;
  
    if (days > 0) {
      return `${days}D ${hours}H ${minutes}M`;
    } else if (hours > 0) {
      return `${hours}H ${minutes}M`;
    }
    return `${minutes}M`;
  };
  
  export const getDefaultDates = () => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);
    return { startDate, endDate };
  };
  
  export const isDatesEqual = (dateA, dateB) => {
    if (dateA === null && dateB === null) {
      return true;
    }
  
    return dateA instanceof Date && dateB instanceof Date 
      ? dateA.getTime() === dateB.getTime() 
      : false;
  };