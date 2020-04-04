import {createSiteMenuTemplate} from "./components/site-menu";
import {createFilterTemplate} from "./components/filter";
import {createBoardTemplate} from "./components/board";
import {createFormTaskEditTemplate} from "./components/tasks-edit";
import {createTaskItemTemplate} from "./components/task-item";
import {createButtonLoadMoreTemplate} from "./components/button-load";

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteContainerBoardElement = document.querySelector(`.board__tasks`);

render(siteContainerBoardElement, createFormTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(siteContainerBoardElement, createTaskItemTemplate(), `beforeend`);
}

render(siteBoardElement, createButtonLoadMoreTemplate(), `beforeend`);

