class TeacherValidator {

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
      this.errors.push(`teacher data ${spec} is not an Object`);
      this.valid = false;
    }
  }

  _isValidName(name) {
    if (typeof name !== 'string') {
      this.errors.push(`teacher name ${name} is not a String`);
      this.valid = false;
    }
  }
}

export default TeacherValidator;
