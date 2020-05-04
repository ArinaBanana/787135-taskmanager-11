import Task from "../components/task-item";
import TasksEdit from "../components/tasks-edit";
import {render, replace, remove} from "../utils/methods-for-components";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const EmptyTask = {};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task, mode) {
    this._mode = mode;

    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TasksEdit(task);

    this._taskComponent.setEditClickButtonHandler(() => {
      this._replaceTaskToEdit();
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskEditComponent.setEditFormSubmitHandler(() => {
      const data = this._taskEditComponent.getData();
      this._onDataChange(this, task, data);
    });

    this._taskEditComponent.setDeleteButtonClickHandler(() => this._onDataChange(this, task, null));

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
      this._replaceEditToTask();
    } else {
      render(this._container, this._taskComponent, `beforeend`);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToTask();
    }
  }

  destroy() {
    remove(this._taskEditComponent);
    remove(this._taskComponent);
    // в дальнейшем здесь удалить обработчики событий
  }

  _replaceEditToTask() {
    this._taskEditComponent.reset();

    if (document.contains(this._taskEditComponent.getElement())) {
      replace(this._taskComponent, this._taskEditComponent);
    }

    this._mode = Mode.DEFAULT;
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.EDIT;
  }
}

export {Mode, EmptyTask};
