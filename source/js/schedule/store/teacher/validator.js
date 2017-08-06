class TeacherValidator {

  constructor() {
    this.message = null;
  }

  valid(data) {
    let state = true;
    if (!(data instanceof Object)) {
      this.message = `teacher data ${data} is not an Object`;
      state = false;
    }

    if (typeof data.name !== 'string') {
      this.message = `teacher name ${data.name} is not a String`;
      state = false;
    }

    return {
      state,
      message: this.message,
    };
  }
}

export default TeacherValidator;
