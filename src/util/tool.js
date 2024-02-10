// take a date and return a string of how long ago it was
const getMetaData = (date) => {
  const currentDate = new Date();
  const seconds = Math.floor((currentDate - date) / 1000);
  
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  }
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} hours ago`;
  }
  
  const days = Math.floor(hours / 24);
  if (days === 1) {
    const formattedDate = formatDate(date);
    return `Yesterday at ${formattedDate}`;
  }
  
  const years = Math.floor(days / 365);
  if (years === 0) {
    const formattedDate = formatDate(date, true);
    return `${formattedDate} at ${formatTime(date)}`;
  }
  
  const formattedDate = formatDate(date, true, true);
  return `${formattedDate} at ${formatTime(date)}`;
};

const formatDate = (date, includeYear = false, includeMonth = false) => {
  const options = {
    day: '2-digit', // Add leading zero for days less than 10
    month: includeMonth ? 'short' : undefined,
    year: includeYear ? 'numeric' : undefined,
  };
  return date.toLocaleDateString(undefined, options);
};

const formatTime = (date) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // Exclude AM/PM
  };
  return date.toLocaleTimeString(undefined, options);
};

export { getMetaData };
