import Store from '../store-base';
import SchoolValidator from './validator';

class SchoolStore extends Store {

  add(data) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    const validator = new SchoolValidator();
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

export default SchoolStore;
