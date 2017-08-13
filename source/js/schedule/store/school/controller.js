import Store from '../store-base';
import SchoolValidator from './validator';

class SchoolStore extends Store {

  add(data) {
    const validator = new SchoolValidator();
    return validator.validate(data)
      .then(response => super.add(data))
      .catch(error => error);
  }
}

export default SchoolStore;
