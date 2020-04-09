import {createSiteMenuTemplate} from "./components/site-menu";
import {createFiltersTemplate} from "./components/filters";
import {createBoardTemplate} from "./components/board";
import {createTasksEditTemplate} from "./components/tasks-edit";
import {createTaskItemTemplate} from "./components/task-item";
import {createButtonLoadTemplate} from "./components/button-load";

import {generateFilters} from "./mocks/filters";
import {generateTasks} from "./mocks/task";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFiltersTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteContainerBoardElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteContainerBoardElement, createTasksEditTemplate(tasks[0]), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

for (let i = 0; i < showingTasksCount; i++) {
  render(siteContainerBoardElement, createTaskItemTemplate(tasks[i]), `beforeend`);
}

render(siteBoardElement, createButtonLoadTemplate(), `beforeend`);

const buttonLoad = siteBoardElement.querySelector(`.load-more`);

buttonLoad.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks
    .slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(siteContainerBoardElement, createTaskItemTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    buttonLoad.remove();
  }
});
