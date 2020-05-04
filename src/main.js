import SiteMenu from "./components/site-menu";
import Board from "./components/board";
import BoardController from "./controllers/board";
import FilterController from "./controllers/filter";
import TasksModel from "./models/tasks";

import {generateTasks} from "./mocks/task";

import {render} from "./utils/methods-for-components";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

render(siteHeaderElement, new SiteMenu(), `beforeend`);
// render(siteMainElement, new Filters(filters), `beforeend`);

const filterController = new FilterController(siteMainElement, tasksModel);
filterController.render();

const board = new Board();
render(siteMainElement, board, `beforeend`);

const boardController = new BoardController(board, tasksModel);
boardController.render();
