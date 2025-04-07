export default class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error('');
      }
      
      this._element = null;
      this._callback = {};
    }
  
    getTemplate() {
      throw new Error('');
    }
  
    getElement() {
      if (!this._element) {
        this._element = this._createElement(this.getTemplate());
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