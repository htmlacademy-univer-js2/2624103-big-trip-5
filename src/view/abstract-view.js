export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('Cannot instantiate AbstractView directly.');
    }
    this._element = null;
    this._callback = {};
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  get element() {
    if (!this._element) {
      this._element = this._createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  _createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }
}
