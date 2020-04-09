const generateTask = () => {
  return {
    description: `Example default task with default color.`,
    dueDate: Math.random() > 0.5 ? new Date() : null,
    repeatingDays: null,
    color: `black`,
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTasks};
