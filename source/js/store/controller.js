class Store {

  constructor() {
    this.items = new Map();
  }

  find(id) {
    return this.items.get(id);
  }

  add(id, value) {
    this.items.set(id, value);
  }
}

export default Store;
