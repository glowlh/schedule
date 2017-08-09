import StoreBase from '../store-base';
import ClassroomValidator from './validator';

class ClassroomStore extends StoreBase {

  constructor(store) {
    super(store);
  }

  add(data) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    const validator = new ClassroomValidator();
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

export default ClassroomStore;
