class StoreBase {

  constructor(store) {
    this.store = store;
    this.items = new Map();
  }

  findByName(name) {
    let result = null;
    this.items.forEach((it) => {
      if (it.name === name) {
        result = it;
      }
    });

    return result;
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
    const newData = Object.assign({}, data);
    newData.id = id;
    this.items.set(id, newData);
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
    const count = this.items.size + 1;
    return count.toString();
  }
}

export default StoreBase;
