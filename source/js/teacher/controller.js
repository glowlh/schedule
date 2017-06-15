class Teacher {

  constructor(options) {
    if (!(options instanceof Object)) {
      return;
    }

    this.name = options.name;
  }
}

export default Teacher;
