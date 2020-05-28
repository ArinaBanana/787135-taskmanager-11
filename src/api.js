import TaskModel from "./models/task";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class API {
  constructor(endPoint, authorization) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getTasks() {
    return this._load({
      url: `tasks`,
    }).then((response) => response.json())
      .then(TaskModel.parseTasks);
  }

  createTask(task) {
    return this._load({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task.toRaw()),
      headers: new Headers({"Content-Type": `application/json`})
    }).then((response) => response.json())
      .then(TaskModel.parseTask);
  }

  deleteTask(id) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.DELETE,
    });
  }

  updateTask(id, data) {
    return this._load({
      url: `tasks/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRaw()),
      headers: new Headers({"Content-Type": `application/json`}),
    }).then((response) => response.json())
      .then(TaskModel.parseTask);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
