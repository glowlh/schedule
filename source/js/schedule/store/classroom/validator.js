class ClassroomValidator {

  validate(spec) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    this.errors = [];
    this.valid = true;

    this._isObject(spec);
    this._isValidName(spec.name);
    this._isValidCount(spec.count);

    if (this.valid) {
      deferred.resolve({ valid: this.valid });
    } else {
      deferred.reject({
        valid: this.valid,
        errors: this.errors,
      });
    }

    return deferred.promise;
  }

  _isObject(spec) {
    if (!(spec instanceof Object)) {
      this.errors.push(`classroom data ${spec} is not an Object`);
      this.valid = false;
    }
  }

  _isValidName(name) {
    if (typeof name !== 'string') {
      this.errors.push(`classroom name ${name} is not a String`);
      this.valid = false;
    }
  }

  _isValidCount(count) {
    if (typeof count !== 'number') {
      this.errors.push(`classroom count ${count} is not a Number`);
      this.valid = false;
    }
  }
}

export default ClassroomValidator;
