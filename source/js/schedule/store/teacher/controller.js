import Store from '../store-base';
import TeacherValidator from './validator';

class TeacherStore extends Store {

  add(data) {
    const validator = new TeacherValidator();
    return validator.validate(data)
      .then(() => super.add(data))
      .catch(error => error);
  }
}

export default TeacherStore;
