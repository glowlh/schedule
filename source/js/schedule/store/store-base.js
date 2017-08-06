class StoreBase {

  constructor(store) {
    this.store = store;
    this.items = new Map();
  }

  findByName(name) {
    return this.items.find(it => it.data.name === name);
  }

  findById(id) {
    return this.items.get(id);
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
    if (!this.isExist(name)) {
      return;
    }

    const item = this.findByName(name);
    this.items.delete(item.id);
  }

  isExist(name) {
    return !!this.findByName(name);
  }

  _incrementId() {
    let count = this.items.size + 1;
    return count.toString();
  }
}

export default StoreBase;
