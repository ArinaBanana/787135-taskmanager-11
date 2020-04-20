import Task from "../components/task-item";
import TasksEdit from "../components/tasks-edit";
import Sort from "../components/sort";
import ButtonLoad from "../components/button-load";
import BoardTasks from "../components/board-tasks";

import {remove, render, replace} from "../utils/methods-for-components";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskList, task) => {
  const onEditButtonClick = () => {
    replace(taskEditComponent, taskComponent);
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replace(taskComponent, taskEditComponent);
  };

  const taskComponent = new Task(task);
  taskComponent.setEditClickButtonHandler(onEditButtonClick);

  const taskEditComponent = new TasksEdit(task);
  taskEditComponent.setEditFormSubmitHandler(onEditFormSubmit);

  render(taskList, taskComponent, `beforeend`);
};

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._buttonLoad = new ButtonLoad();
    this._board = new BoardTasks();
  }

  render(tasks) {
    const container = this._container.getElement();

    render(container, this._sort, `afterbegin`);
    render(container, this._board, `beforeend`);

    const taskListElement = this._board.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    tasks
      .slice(0, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    render(container, this._buttonLoad, `beforeend`);

    this._buttonLoad.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks
        .slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._buttonLoad);
      }
    });
  }
}
