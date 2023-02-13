export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._selector = document.querySelector(selector);
    }

    addItem (element) {
        this._selector.prepend(element);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}