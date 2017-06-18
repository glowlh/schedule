import Store from '../store/controller';
import Classroom from '../classroom/controller';

const PREFIX_ID = 'classroom';

class ClassroomStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    const classroom = new Classroom(data);
    const name = classroom.name;
    if (this.find(name)) {
      return;
    }

    const id = this._generateId(PREFIX_ID);
    const item = {
      id,
      classroom,
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
      if (it.classroom.name === name) {
        result = it;
      }
    });

    return result;
  }
}

const classroomStore = new ClassroomStore();
export default classroomStore;
