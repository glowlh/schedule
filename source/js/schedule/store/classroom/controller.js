import StoreBase from '../store-base';
import ClassroomValidator from './validator';

class ClassroomStore extends StoreBase {

  add(data) {
    const validator = new ClassroomValidator();
    return validator.validate(data)
      .then(() => super.add(data))
      .catch(error => error);
  }
}

export default ClassroomStore;
