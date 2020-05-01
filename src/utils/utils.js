import moment from "moment";

const createTimeFormat = (date) => {
  return moment(date).format(`hh:mm`);
};

const createDateFormat = (date) => {
  return moment(date).format(`DD MMMM`);
};

export {createTimeFormat, createDateFormat};
