import StoreBase from '../store-base';
import ClassroomValidator from './validator';

class ClassroomStore extends StoreBase {

  add(data) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    const validator = new ClassroomValidator();
    const validationObj = validator.validate(data);
    if (!validationObj.valid) {
      deferred.reject(validationObj);
      return deferred.promise;
    }

    deferred.resolve(data);
    super.add(data);

    return deferred.promise;
  }
}

export default ClassroomStore;
