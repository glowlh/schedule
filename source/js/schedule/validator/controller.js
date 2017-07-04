class Validator {

  constructor(scheme = null) {
    this.scheme = scheme;
  }

  getScheme() {
    return this.scheme;
  }

  setScheme(scheme) {
    this.scheme = scheme;
  }

  valid(data = null, store) {
    if (!this.scheme) {
      return;
    }

    return this.scheme.valid(data, store);
  }
}

export default Validator;
