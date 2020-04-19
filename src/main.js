import SiteMenu from "./components/site-menu";
import Filters from "./components/filters";
import Board from "./components/board";
import Sort from "./components/sort";
import TasksEdit from "./components/tasks-edit";
import Task from "./components/task-item";
import ButtonLoad from "./components/button-load";

import {generateFilters} from "./mocks/filters";
import {generateTasks} from "./mocks/task";

import {render, replace, remove} from "./utils/methods-for-components";

const TASK_COUNT = 22;
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

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new Sort(), `afterbegin`);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

  tasks
    .slice(0, showingTasksCount)
    .forEach((task) => renderTask(taskListElement, task));

  const buttonLoadComponent = new ButtonLoad();
  render(boardComponent.getElement(), buttonLoadComponent, `beforeend`);

  buttonLoadComponent.setClickHandler(() => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      remove(buttonLoadComponent);
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new SiteMenu(), `beforeend`);
render(siteMainElement, new Filters(filters), `beforeend`);

const boardComponent = new Board();
render(siteMainElement, boardComponent, `beforeend`);
renderBoard(boardComponent, tasks);
