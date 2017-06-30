class Store {

  constructor() {
    this.items = new Map();
  }

  find(name) {
    let result = null;
    this.items.forEach((it) => {
      if (it.data.name === name) {
        result = it;
      }
    });

    return result;
  }

  add(data) {
    const name = data.name;
    if (this.isExist(name)) {
      return;
    }

    const id = this._incrementId();
    const item = {
      id,
      data,
    };
    this.items.set(id, item);
  }

  delete(name) {
    const item = this.isExist(name);
    if (!item) {
      return;
    }

    this.items.delete(item.id);
  }

  isExist(name) {
    return this.find(name) ? true : false;
  }

  findById(id) {
    return this.items.get(id);
  }

  _incrementId() {
    let count = this.items.size + 1;

    return count.toString();
  }
}

export default Store;
