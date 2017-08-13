class TeacherValidator {

  validate(spec) {
    this.errors = [];
    this.valid = true;

    this._isObject(spec);
    this._isValidName(spec.name);

    return {
      valid: this.valid,
      errors: this.errors,
    };
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
