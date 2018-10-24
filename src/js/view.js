import template from "./../templates/card.hbs";

export default class View {
  constructor() {}

  display(items, target) {
    target.innerHTML = "";
    const markup = items.reduce((acc, element) => acc + template(element), ``);
    target.innerHTML = markup;
  }
}
