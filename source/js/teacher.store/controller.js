import Store from '../store/controller';
import Teacher from '../teacher/controller';

const PREFIX_ID = 'teacher';

class TeacherStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    const teacher = new Teacher(data);
    const name = teacher.name;
    if (this.find(name)) {
      return;
    }

    const id = this._generateId(PREFIX_ID);
    const item = {
      id,
      teacher,
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
      if (it.teacher.name === name) {
        result = it;
      }
    });

    return result;
  }
}

const teacherStore = new TeacherStore();
export default teacherStore;
