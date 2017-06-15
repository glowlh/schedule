class Classroom {

  constructor(options) {
    if (!(options instanceof Object)) {
      return;
    }

    this.name = options.name;
    this.count = options.count;
    this.description = options.description;
  }
}

export default Classroom;
