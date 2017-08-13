class SchoolValidator {

  validate(spec) {
    this.errors = [];
    this.valid = true;

    this._isObject(spec);
    this._isValidName(spec.name);
    this._isValidCount(spec.count);

    return {
      valid: this.valid,
      errors: this.errors,
    };
  }

  _isObject(spec) {
    if (!(spec instanceof Object)) {
      this.errors.push(`school data ${spec} is not an Object`);
      this.valid = false;
    }
  }

  _isValidName(name) {
    if (typeof name !== 'string') {
      this.errors.push(`school name ${name} is not a String`);
      this.valid = false;
    }
  }

  _isValidCount(count) {
    if (typeof count !== 'number') {
      this.errors.push(`school count ${count} is not a Number`);
      this.valid = false;
    }
  }
}

export default SchoolValidator;
