import AbstractComponent from "./abstract-component";

const createBoardTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class BoardTasks extends AbstractComponent {
  getTemplate() {
    return createBoardTasksTemplate();
  }
}
