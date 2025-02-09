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
  const formatTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return {date: formatDate, time: formatTime};
};
