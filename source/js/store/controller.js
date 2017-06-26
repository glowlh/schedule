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
    let count = 0;
    const ids = [...this.items].map(p => p[0]);

    while(true) {
      const isUniqueId  = !ids.some(p => p === `${prefix}-${count}`);
      if (isUniqueId ) {
        break;
      }

      count += 1;
    }

    return `${prefix}-${count}`;
  }
}

export default Store;
