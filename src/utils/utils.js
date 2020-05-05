import moment from "moment";

const createTimeFormat = (date) => {
  return moment(date).format(`hh:mm`);
};

const createDateFormat = (date) => {
  return moment(date).format(`DD MMMM`);
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);

  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export {createTimeFormat, createDateFormat, isRepeating, isOneDay, isOverdueDate};
