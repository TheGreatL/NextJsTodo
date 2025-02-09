const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatDate = (date: Date): {date: string; time: string} => {
  const formatDate = `${monthsOfYear[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours < 12 ? 'AM' : 'PM';

  const formatTime = `${meridiem === 'PM' ? hours - 12 : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${meridiem}`;

  return {date: formatDate, time: formatTime};
};
