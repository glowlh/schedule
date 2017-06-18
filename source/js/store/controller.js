class Store {

  constructor() {
    this.items = new Map();
  }

  get ids() {
    return [...this.items].map(p => p[0]);
  }

  find() {}

  add() {}

  delete() {}

  _generateId(prefix) {
    let count = 0;

    while(true) {
      const isUniqueId  = !this.ids.some(p => p === `${prefix}-${count}`);
      if (isUniqueId ) {
        break;
      }

      count += 1;
    }

    return `${prefix}-${count}`;
  }
}

export default Store;
