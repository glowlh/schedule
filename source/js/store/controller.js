class Store {

  constructor() {
    this.items = new Map();
  }

  find() {}

  add() {}

  delete() {}

  findById(id) {
    return this.items.get(id);
  }

  _generateId(prefix) {
    let count = this.items.size + 1;

    return `${prefix}-${count}`;
  }
}

export default Store;
