class SchoolValidator {

  constructor() {
    this.message = null;
  }

  valid(data) {
    let state = true;
    if (!(data instanceof Object)) {
      this.message = `school data ${data} is not an Object`;
      state = false;
    }

    if (typeof data.name !== 'string' && state) {
      this.message = `school name ${data.name} is not a String`;
      state = false;
    }

    if (typeof data.count !== 'number' && state) {
      this.message = `school count ${data.count} is not a Number`;
      state = false;
    }

    return {
      state,
      message: this.message,
    }
  }
}

export default SchoolValidator;
