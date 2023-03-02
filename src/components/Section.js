export default class Section {
    constructor(renderer , selector) {
        this._renderer = renderer;
        this._selector = document.querySelector(selector);
    }

    addItem (element) {
        this._selector.prepend(element);
    }

    renderItems(items) {
        items.reverse().forEach(item => {
            this._renderer(item);
            console.log(item);
        });
    }
}