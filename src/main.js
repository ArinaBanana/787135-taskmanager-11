import API from "./api";
import SiteMenu, {MenuItem} from "./components/site-menu";
import Board from "./components/board";
import Statistics from "./components/statistics";

import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import TasksModel from "./models/tasks";

import {render} from "./utils/methods-for-components";

const AUTHORIZATION = `Basic hfggerilfo3r94AAAmncfj`;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasksModel = new TasksModel();
const api = new API(AUTHORIZATION);

const siteMenuComponent = new SiteMenu();
render(siteHeaderElement, siteMenuComponent, `beforeend`);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const board = new Board();
render(siteMainElement, board, `beforeend`);

const boardController = new BoardController(board, tasksModel, api);

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const statisticComponent = new Statistics({tasks: tasksModel, dateFrom, dateTo});

render(siteMainElement, statisticComponent, `beforeend`);
statisticComponent.hide();

siteMenuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_TASK:
      siteMenuComponent.setActiveItem(MenuItem.TASKS);
      statisticComponent.hide();
      boardController.show();
      boardController.createTask();
      break;
    case MenuItem.STATISTICS:
      statisticComponent.show();
      boardController.hide();
      break;
    case MenuItem.TASKS:
      statisticComponent.hide();
      boardController.show();
      break;
  }
});

boardController.render({isLoading: true});

api.getTasks().then((tasks) => {
  tasksModel.setTasks(tasks);
  boardController.render({isLoading: false});
});
