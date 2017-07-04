import Store from '../base/controller';
import Scheme from './scheme';
import Validator from '../../validator/controller';

class SchoolStore extends Store {

  constructor(store) {
    super(store);
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

export default SchoolStore;
