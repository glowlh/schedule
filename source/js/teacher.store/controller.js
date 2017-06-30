import Store from '../store/controller';
import Scheme from '../validator.scheme/teacher-scheme';
import Validator from '../validator/controller';

class TeacherStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    const scheme = new Scheme();
    const validator = new Validator(scheme);
    if (!validator.valid(data)) {
      return;
    }
    
    super.add(data);
  }
}

const teacherStore = new TeacherStore();
export default teacherStore;
