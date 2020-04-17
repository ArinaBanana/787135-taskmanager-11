import SiteMenu from "./components/site-menu";
import Filters from "./components/filters";
import Board from "./components/board";
import Sort from "./components/sort";
import TasksEdit from "./components/tasks-edit";
import Task from "./components/task-item";
import ButtonLoad from "./components/button-load";

import {generateFilters} from "./mocks/filters";
import {generateTasks} from "./mocks/task";

import {render} from "./utils/utils";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskList, task) => {
  const onEditButtonClick = () => {
    taskList.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskList.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new Task(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const taskEditComponent = new TasksEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

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

  buttonLoadComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      buttonLoadComponent.getElement().remove();
      buttonLoadComponent.removeElement();
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
