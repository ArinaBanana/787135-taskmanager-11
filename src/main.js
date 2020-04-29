import SiteMenu from "./components/site-menu";
import Filters from "./components/filters";
import Board from "./components/board";
import BoardController from "./controllers/board";
import TasksModel from "./models/tasks";

import {generateFilters} from "./mocks/filters";
import {generateTasks} from "./mocks/task";

import {render} from "./utils/methods-for-components";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

render(siteHeaderElement, new SiteMenu(), `beforeend`);
render(siteMainElement, new Filters(filters), `beforeend`);

const board = new Board();
render(siteMainElement, board, `beforeend`);

const boardController = new BoardController(board, tasksModel);
boardController.render();
