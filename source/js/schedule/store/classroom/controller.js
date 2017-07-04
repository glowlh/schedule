import Store from '../base/controller';
import Scheme from './scheme';
import Validator from '../../validator/controller';

class ClassroomStore extends Store {

  add(data) {
    const scheme = new Scheme();
    const validator = new Validator(scheme);
    if (!validator.valid(data)) {
      return;
    }

    super.add(data);
  }
}

const classroomStore = new ClassroomStore();
export default classroomStore;
