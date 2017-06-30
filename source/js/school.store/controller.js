import Store from '../store/controller';
import Scheme from '../validator.scheme/school-scheme';
import Validator from '../validator/controller';

class SchoolStore extends Store {

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

const schoolStore = new SchoolStore();
export default schoolStore;
