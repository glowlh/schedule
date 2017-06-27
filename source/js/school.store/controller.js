import Store from '../store/controller';

const PREFIX_ID = 'school';

class SchoolStore extends Store {

  constructor() {
    super();
  }

  add(data) {
    super.add(data, PREFIX_ID);
  }
}

const schoolStore = new SchoolStore();
export default schoolStore;
