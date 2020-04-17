import AbstractComponent from "./abstract-component";

const createButtonLoadTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class ButtonLoad extends AbstractComponent {
  getTemplate() {
    return createButtonLoadTemplate();
  }
}
