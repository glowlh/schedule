import Store from '../base/controller';
import ClassroomValidator from './validator';

class ClassroomStore extends Store {

  constructor(store) {
    super(store);
  }

  add(data) {
    const validator = new ClassroomValidator();
    if (!validator.valid(data)) {
      return;
    }

    super.add(data);
  }
}

export default ClassroomStore;
