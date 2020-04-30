import Filters from "../components/filters";
import {FilterTypes, RenderPosition} from "../utils/const";
import {getTasksByFilter} from "../utils/filtration";
import {replace, render} from "../utils/methods-for-components";

export default class FilterController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._filterComponent = null;
    this._activeFilterType = FilterTypes.ALL;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tasksModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allTasks = this._tasksModel.getTasks();

    const filters = Object.values(FilterTypes).map((filterType) => {
      return {
        name: filterType,
        count: getTasksByFilter(allTasks, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new Filters(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange); // wip

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.BEFOREEND);
    }
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
