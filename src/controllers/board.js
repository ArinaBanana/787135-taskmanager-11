import Sort from "../components/sort";
import ButtonLoad from "../components/button-load";
import BoardTasks from "../components/board-tasks";
import TaskController from "./task";

import {remove, render} from "../utils/methods-for-components";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement);
    taskController.render(task);

    return taskController;
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sort = new Sort();
    this._buttonLoad = new ButtonLoad();
    this._board = new BoardTasks();

    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._tasks = [];
  }

  render(tasks) {
    const container = this._container.getElement();
    this._tasks = tasks;

    render(container, this._sort, `afterbegin`);
    render(container, this._board, `beforeend`);

    const taskListElement = this._board.getElement();

    renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount));

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._buttonLoad, `beforeend`);

    this._buttonLoad.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const taskListElement = this._board.getElement();

      renderTasks(taskListElement, this._tasks.slice(prevTasksCount, this._showingTasksCount));

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._buttonLoad);
      }
    });
  }
}
