import Store from '../base/controller';
import SchoolValidator from './validator';

class SchoolStore extends Store {

  constructor(store) {
    super(store);
  }

  add(data) {
    const validator = new SchoolValidator();
    if (!validator.valid(data)) {
      return;
    }

    super.add(data);
  }
}

export default SchoolStore;
