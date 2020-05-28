const AUTHORIZATION = `Basic hfggerilfo3r94AAAmnc`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const HIDDEN_CLASS = `visually-hidden`;
const FILTER_ID_PREFIX = `filter__`;

const MIN_DESCRIPTION_LENGTH = 1;
const MAX_DESCRIPTION_LENGTH = 140;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
const SHAKE_ANIMATION_TIMEOUT = 600;

const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = Object.values(COLOR);

const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

const FilterTypes = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`,
};

const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const MenuItem = {
  NEW_TASK: `control__new-task`,
  STATISTICS: `control__statistic`,
  TASKS: `control__task`,
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    "mo": false,
    "tu": false,
    "we": false,
    "th": false,
    "fr": false,
    "sa": false,
    "su": false,
  },
  color: COLOR.BLACK,
  isFavorite: false,
  isArchive: false,
};

const CodesResponse = {
  OK: 200,
  MULTIPLE_CHOICE: 300,
};

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const colorToHex = {
  black: `#000000`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
  yellow: `#ffe125`,
};

export {
  AUTHORIZATION,
  END_POINT,
  HIDDEN_CLASS,
  FILTER_ID_PREFIX,
  MAX_DESCRIPTION_LENGTH,
  MIN_DESCRIPTION_LENGTH,
  SHOWING_TASKS_COUNT_ON_START,
  SHOWING_TASKS_COUNT_BY_BUTTON,
  SHAKE_ANIMATION_TIMEOUT,
  DAYS,
  COLORS,
  RenderPosition,
  FilterTypes,
  SortType,
  MenuItem,
  Mode,
  EmptyTask,
  CodesResponse,
  Method,
  colorToHex,
};
