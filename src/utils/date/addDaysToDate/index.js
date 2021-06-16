/**
 *
 * The setDate() method sets the day of the Date object relative to the beginning of the currently set month.
 *
 * @param {Date | String} date
 * @param {Number} days
 */
const addDaysToDate = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);

  return d.toISOString().split('T')[0];
};

export default addDaysToDate;
