import Store from '../base/controller';
import TeacherValidator from './validator';

class TeacherStore extends Store {

  constructor(store) {
    super(store);
  }

  add(data) {
    const validator = new TeacherValidator();
    if (!validator.valid(data)) {
      return;
    }
    
    super.add(data);
  }
}

export default TeacherStore;
