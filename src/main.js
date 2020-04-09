import {createSiteMenuTemplate} from "./components/site-menu";
import {createFiltersTemplate} from "./components/filters";
import {createBoardTemplate} from "./components/board";
import {createTasksEditTemplate} from "./components/tasks-edit";
import {createTaskItemTemplate} from "./components/task-item";
import {createButtonLoadTemplate} from "./components/button-load";

import {generateFilters} from "./mocks/filters";
import {generateTasks} from "./mocks/task";

const TASK_COUNT = 3;

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
const siteContainerBoardElement = document.querySelector(`.board__tasks`);

render(siteContainerBoardElement, createTasksEditTemplate(tasks[0]), `beforeend`);

for (let i = 0; i < tasks.length; i++) {
  render(siteContainerBoardElement, createTaskItemTemplate(tasks[i]), `beforeend`);
}

render(siteBoardElement, createButtonLoadTemplate(), `beforeend`);

