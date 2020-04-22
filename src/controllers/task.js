import Task from "../components/task-item";
import TasksEdit from "../components/tasks-edit";
import {render, replace} from "../utils/methods-for-components";

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._taskEditComponent = new TasksEdit(task);

    this._taskComponent.setEditClickButtonHandler(() => {
      this._replaceTaskToEdit();
    });

    this._taskEditComponent.setEditFormSubmitHandler(() => {
      this._replaceEditToTask();
    });

    render(this._container, this._taskComponent, `beforeend`);
  }

  _replaceEditToTask() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _replaceTaskToEdit() {
    replace(this._taskEditComponent, this._taskComponent);
  }
}
