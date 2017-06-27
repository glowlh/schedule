import Store from '../store/controller';

const PREFIX_ID = 'teacher';

class TeacherStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    super.add(data, PREFIX_ID);
  }
}

const teacherStore = new TeacherStore();
export default teacherStore;
