/**
 * Calculates the date of n days ago from today as a string representation.
 * @param {*} params
 */

const daysAgo = days => {
  const today = new Date();
  today.setDate(today.getDate() - Math.abs(days));

  return today.toISOString().split('T')[0];
};

export default daysAgo;
