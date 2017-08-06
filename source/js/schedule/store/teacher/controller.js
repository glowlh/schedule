import Store from '../store-base';
import TeacherValidator from './validator';

class TeacherStore extends Store {

  constructor(store) {
    super(store);
  }

  add(data) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    const validator = new TeacherValidator();
    const validationError = validator.valid(data);
    if (!validationError.state) {
      deferred.reject(validationError.message);
      return deferred.promise;
    }

    deferred.resolve(data);
    super.add(data);

    return deferred.promise;
  }
}

export default TeacherStore;
