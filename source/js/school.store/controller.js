import Store from '../store/controller';
import School from '../school/controller';

const PREFIX_ID = 'school';

class SchoolStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    const school = new School(data);
    const name = school.name;
    if (this.find(name)) {
      return;
    }

    const id = this._generateId(PREFIX_ID);
    const item = {
      id,
      school,
    };
    this.items.set(id, item);
  }

  delete(name) {
    const item = this.find(name);
    if (!item) {
      return;
    }

    this.items.delete(item.id);
  }

  find(name) {
    let result = null;
    this.items.forEach((it) => {
      if (it.school.name === name) {
        result = it;
      }
    });

    return result;
  }
}

const schoolStore = new SchoolStore();
export default schoolStore;
