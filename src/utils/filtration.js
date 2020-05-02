import {FilterTypes} from "./const";
import {isRepeating, isOneDay, isOverdueDate} from "./utils";

const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

export const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

export const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterTypes.ALL:
      return getNotArchiveTasks(tasks);
    case FilterTypes.ARCHIVE:
      return getArchiveTasks(tasks);
    case FilterTypes.FAVORITES:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case FilterTypes.OVERDUE:
      return getOverdueTasks(getNotArchiveTasks(tasks), nowDate);
    case FilterTypes.REPEATING:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case FilterTypes.TODAY:
      return getTasksInOneDay(getNotArchiveTasks(tasks), nowDate);
  }

  return tasks;
};

export {getTasksByFilter};
